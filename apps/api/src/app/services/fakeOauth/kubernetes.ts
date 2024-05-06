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
  isMobile: boolean,
  initViewport: { vh: number; vw: number },
) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

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

  const pod = k8sApi
    .createNamespacedPod('default', podManifest)
    .then((response) => {
      return response.body;
    })
    .catch((error) => {
      if (error.response && error.response.statusCode === 409) {
        return k8sApi.readNamespacedPod(podManifest.metadata.name, 'default');
      } else {
        throw error;
      }
    });

  // TODO:  const guacamoleConn =

  return pod;
}
