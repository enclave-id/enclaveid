import * as k8s from '@kubernetes/client-node';
import { prisma } from '../prisma';
import { createGuacConnection, getGuacAuthToken } from './guacamole';
import { logger } from '../logging';
import { ChromePod } from '@prisma/client';

// Number of idle pods to keep in the buffer
// This makes sure users can connect to available pods quickly
// Adjust the number based on the expected load
const BUFFER_SIZE = 5;

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const k8sExec = new k8s.Exec(kc);

function createServiceTemplate(podName, port): k8s.V1Service {
  return {
    apiVersion: 'v1',
    kind: 'Service',
    metadata: {
      name: `${podName}-service`,
    },
    spec: {
      type: 'ClusterIP',
      selector: {
        name: podName,
      },
      ports: [
        {
          name: 'rdp',
          port: port,
          targetPort: 3389,
        },
      ],
    },
  };
}

function createPodTemplate(name): k8s.V1Pod {
  return {
    apiVersion: 'v1',
    kind: 'Pod',
    metadata: {
      name: name,
      labels: {
        name: name,
        class: 'chrome-pod',
      },
    },
    spec: {
      containers: [
        {
          name: 'rdesktop',
          image: 'lscr.io/linuxserver/rdesktop:latest',
          ports: [
            {
              containerPort: 3389,
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

async function waitForPodReady(podName, interval = 3000, timeout = 30000) {
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

  const podManifest = createPodTemplate(podName);

  // TODO: For now we create a service for each pod, not sure if this is the best way
  const servicePort = 3389;
  const serviceManifest = createServiceTemplate(podName, servicePort);
  const serviceName = serviceManifest.metadata.name;

  try {
    await k8sApi.createNamespacedPod('default', podManifest);
    await waitForPodReady(podName);
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

    throw error;
  }

  try {
    await k8sApi.createNamespacedService('default', serviceManifest);
  } catch (error) {
    logger.error(`Failed to create service: ${error}`);

    try {
      await k8sApi.deleteNamespacedService(serviceName, 'default');
    } catch (e) {
      if (e.body.code !== 404) {
        logger.error(`Failed to delete service: ${e}`);
        throw e;
      }
    }
    throw error;
  }

  // The pod is only saved to the database if the creation of both svc/pod was successful
  return await prisma.chromePod.create({
    data: {
      chromePodId: podName,
      rdpUsername: 'abc',
      rdpPassword: newPassword,
      rdpPort: servicePort,
      hostname: `${serviceName}.default.svc.cluster.local`,
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
): Promise<ChromePod> {
  // If the user already has a pod, return it
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      chromePod: true,
    },
  });

  if (user?.chromePod) {
    return user.chromePod;
  }

  let freePod = await prisma.chromePod.findFirst({
    where: {
      user: null,
    },
  });

  if (!freePod) {
    logger.info('No free pods available, creating a new one');
    freePod = await createNewPod();
  }

  let guacAuthToken;
  try {
    guacAuthToken = await getGuacAuthToken();
  } catch (error) {
    logger.error(`Failed to authenticate to Guacamole API: ${error}`);
    throw error;
  }

  try {
    await createGuacConnection(guacAuthToken, initViewport, freePod);
  } catch (error) {
    logger.error(`Failed to create Guacamole connection: ${error}`);
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
