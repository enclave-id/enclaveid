import k8s from '@kubernetes/client-node';
import { prisma } from '../prisma';

const k8sApi = k8s.Config.defaultClient();

const podManifest = {
  apiVersion: 'v1',
  kind: 'Pod',
  metadata: {
    name: 'chrome-pod',
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

export async function provisionChrome(
  userId: string,
): Promise<string | undefined> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) throw new Error('User not found');

  const podId = `chrome-pod-${userId}`;

  prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      chromePod: {
        connectOrCreate: {
          where: {
            chromePodK8sId: podId,
          },
          create: {
            chromePodK8sId: podId,
            rdpUsername: 'user',
            rdpPassword: 'password',
          },
        },
      },
    },
  });

  podManifest.metadata.name = podId;

  const podExists = await k8sApi
    .readNamespacedPod(podManifest.metadata.name, 'default')
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });

  if (!podExists) {
    return await k8sApi
      .createNamespacedPod('default', podManifest)
      .then((response) => {
        return response.body.metadata?.name;
      });
  }
}
