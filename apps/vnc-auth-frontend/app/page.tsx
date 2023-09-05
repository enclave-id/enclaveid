'use client';

import { BoundingBox } from 'puppeteer';
import { useEffect, useState } from 'react';
import WebSocket from 'ws';

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

  // vncClient.addEventListener('securityfailure', function (ev) {
  //   console.error(
  //     'Security issue: ' + ev.detail.status + ' - ' + ev.detail.reason
  //   );
  // });
}

function handleNewTouchProxy(data: BoundingBox) {
  const touchProxy = document.createElement('input');

  touchProxy.type = 'email';
  touchProxy.height = data.height;
  touchProxy.width = data.width;
  touchProxy.style.position = 'absolute';
  touchProxy.style.marginTop = data.y.toString();
  touchProxy.style.marginLeft = data.x.toString();
  touchProxy.style.zIndex = '9999999';

  document.body.insertAdjacentElement('afterend', touchProxy);
}

export default function Home() {
  useEffect(() => {
    const target = document.getElementById('noVNC');

    if (target) setupNoVNC(target);
  }, []);

  useEffect(() => {
    const ws = new WebSocket('ws://www.host.com/path');

    ws.on('connection', () => {
      console.log('WS connected');
    });

    ws.on('error', console.error);

    ws.on('message', handleNewTouchProxy);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div id="noVNC"></div>
    </main>
  );
}
