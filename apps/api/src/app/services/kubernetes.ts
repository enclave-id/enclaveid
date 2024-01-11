import k8s from '@kubernetes/client-node';

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

export async function provisionChrome(userId: string): Promise<string> {
  podManifest.metadata.name = `chrome-pod-${userId}`;

  // Check if pod exists
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
