'use client';

import { useEffect } from 'react';

async function setupNoVNC(target: HTMLElement) {
  const RFB = (await import('@novnc/novnc/core/rfb')).default;

  const vncClient = new RFB(target, 'ws://192.168.1.26:6080/websockify', {
    credentials: {
      username: 'vnc',
      password: 'magi1000',
    },
    clipViewport: true,
  });

  vncClient.addEventListener('connect', function () {
    console.log('Connected to the VNC server');
  });

  vncClient.addEventListener('disconnect', function () {
    console.log('Disconnected from the VNC server');
  });

  vncClient.addEventListener('securityfailure', function (ev) {
    console.error(
      'Security issue: ' + ev.detail.status + ' - ' + ev.detail.reason
    );
  });

  console.log(vncClient);
}

export default function Home() {
  useEffect(() => {
    const target = document.getElementById('noVNC');

    if (target) setupNoVNC(target);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div id="noVNC"></div>
    </main>
  );
}
