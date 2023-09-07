export async function setupNoVNC(target: HTMLElement) {
  const RFB = (await import('@novnc/novnc/core/rfb')).default;

  const vncClient = new RFB(
    target,
    `ws://${process.env.NEXT_PUBLIC_HOST_ADDRESS}:6901/websockify`,
    {
      credentials: {
        username: 'vncuser',
        password: 'vncpassword',
        target: `${process.env.NEXT_PUBLIC_HOST_ADDRESS}:6901`,
      },
    }
  );

  vncClient.clipViewport = true;
  vncClient.scaleViewport = true;
  vncClient.resizeSession = true;

  vncClient.addEventListener('connect', function () {
    console.log('Connected to the VNC server');
  });

  vncClient.addEventListener('disconnect', function () {
    console.log('Disconnected from the VNC server');
  });

  // vncClient.addEventListener('securityfailure', function (ev) {
  //   console.error(
  //     'Security issue: ' + ev.detail.status + ' - ' + ev.detail.reason
  //   );
  // });

  return vncClient;
}
