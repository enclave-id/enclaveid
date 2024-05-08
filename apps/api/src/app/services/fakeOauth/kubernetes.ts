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

export function createPodTemplate(name) {
  return {
    apiVersion: 'v1',
    kind: 'Pod',
    metadata: {
      name: name,
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

export async function createNewPod() {
  const newPassword = Math.random().toString(36).substring(2, 10);

  const podRecord = await prisma.chromePod.create({
    data: {
      rdpUsername: 'abc',
      rdpPassword: newPassword,
    },
  });

  const podName = podRecord.chromePodId;
  const podManifest = createPodTemplate(podName);
  await k8sApi.createNamespacedPod('default', podManifest);

  await changeRdpPassword(podName, newPassword);

  return podRecord;
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

  const guacAuthToken = await getGuacAuthToken();
  await createGuacConnection(
    guacAuthToken,
    freePod.chromePodId,
    freePod.rdpPassword,
    initViewport,
  );

  // Create new pod to keep the buffer full
  // We don't await this promise, as we don't want to block the response
  createNewPod();

  return freePod;
}
