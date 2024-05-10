import * as k8s from '@kubernetes/client-node';
import { prisma } from '../prisma';
import { createGuacConnection, getGuacAuthToken } from './guacamole';
import { logger } from '../logging';

// Number of idle pods to keep in the buffer
// This makes sure users can connect to available pods quickly
// Adjust the number based on the expected load
const BUFFER_SIZE = 5;

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const k8sExec = new k8s.Exec(kc);

function getRandomPort(min = 1024, max = 49151) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function createPodTemplate(name, port): k8s.V1Pod {
  // In microk8s for some reason pod2pod communication is not working
  // so we go through the host interface and rotate the port

  return {
    apiVersion: 'v1',
    kind: 'Pod',
    metadata: {
      name: name,
    },
    spec: {
      hostNetwork: process.env.NODE_ENV === 'development',
      containers: [
        {
          name: 'rdesktop',
          image: 'lscr.io/linuxserver/rdesktop:latest',
          ports: [
            {
              containerPort: port,
            },
          ],
          env: [
            {
              name: 'TZ',
              value: 'Etc/UTC',
            },
            {
              name: 'PUID',
              value: '1000',
            },
            {
              name: 'PGID',
              value: '1000',
            },
          ],
        },
      ],
    },
  };
}

async function changeRdpPassword(podName, newPassword) {
  const command = ['/bin/sh', '-c', `echo 'abc:${newPassword}' | chpasswd`];

  return await k8sExec
    .exec(
      'default',
      podName,
      'rdesktop',
      command,
      process.stdout,
      process.stderr,
      process.stdin,
      true /* tty */,
    )
    .then(() => {
      return newPassword;
    })
    .catch((err) => {
      logger.error(`Failed to change RDP password for pod ${podName}: ${err}`);
      throw err;
    });
}

async function waitForPodReady(podName, interval = 1000, timeout = 30000) {
  const startTime = Date.now();

  return new Promise((resolve, reject) => {
    const intervalId = setInterval(async () => {
      try {
        const { body: pod } = await k8sApi.readNamespacedPod(
          podName,
          'default',
        );
        const isReady = pod.status.conditions?.some(
          (condition) =>
            condition.type === 'Ready' && condition.status === 'True',
        );

        if (isReady) {
          clearInterval(intervalId);
          resolve(pod.status.podIP);
        } else if (Date.now() - startTime > timeout) {
          clearInterval(intervalId);
          reject(
            new Error(
              'Timeout: Pod did not become ready in the expected time.',
            ),
          );
        }
      } catch (error) {
        clearInterval(intervalId);
        reject(new Error('Failed to get pod status: ' + error.message));
      }
    }, interval);
  });
}

export async function createNewPod() {
  // TODO: These should come from the database
  const podName = `chrome-pod-${Math.random().toString(36).substring(2, 10)}`;
  const newPassword = Math.random().toString(36).substring(2, 10);

  const podPort =
    process.env.NODE_ENV === 'development' ? getRandomPort() : 3389;
  const podManifest = createPodTemplate(podName, podPort);

  let hostname;
  try {
    await k8sApi.createNamespacedPod('default', podManifest);
    hostname = await waitForPodReady(podName);
    await changeRdpPassword(podName, newPassword);
  } catch (error) {
    logger.error(`Failed to create pod: ${error}`);

    try {
      await k8sApi.deleteNamespacedPod(podName, 'default');
    } catch (e) {
      if (e.body.code !== 404) {
        logger.error(`Failed to delete pod: ${e}`);
        throw e;
      }
    }

    // Rethrow the original error so that the record is not created in the database
    throw error;
  }

  return await prisma.chromePod.create({
    data: {
      chromePodId: podName,
      rdpUsername: 'abc',
      rdpPassword: newPassword,
      rdpPort: podPort,
      hostname: hostname,
    },
  });
}

export async function initializePodsBuffer() {
  const podPromises = Array.from({ length: BUFFER_SIZE }).map(async () => {
    return await createNewPod();
  });

  return await Promise.all(podPromises);
}

export async function connectFreePod(
  userId: string,
  isMobile: boolean,
  initViewport: { vh: number; vw: number },
) {
  let freePod = await prisma.chromePod.findFirst({
    where: {
      user: null,
    },
  });

  if (!freePod) {
    logger.info('No free pods available, creating a new one');
    freePod = await createNewPod();
  }

  try {
    const guacAuthToken = await getGuacAuthToken();
    await createGuacConnection(guacAuthToken, initViewport, freePod);
  } catch (error) {
    logger.error(`Failed to connect to Guacamole: ${error}`);
    throw error;
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      chromePod: {
        connect: {
          chromePodId: freePod.chromePodId,
        },
      },
    },
  });

  // Create new pod to keep the buffer full
  // We don't await this promise, as we don't want to block the response
  createNewPod();

  return freePod;
}
