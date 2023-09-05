'use client';

import { BoundingBox } from 'puppeteer';
import { useEffect, useState } from 'react';

async function setupNoVNC(target: HTMLElement) {
  const RFB = (await import('@novnc/novnc/core/rfb')).default;

  const vncClient = new RFB(target, 'ws://192.168.1.26:6080/websockify', {
    credentials: {
      username: 'vnc',
      password: 'magi1000',
    },
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

function handleNewTouchProxy(boundingBox: BoundingBox) {
  const touchProxy = document.createElement('input');

  touchProxy.type = 'email';
  touchProxy.height = boundingBox.height;
  touchProxy.width = boundingBox.width;
  touchProxy.style.position = 'absolute';
  touchProxy.style.marginTop = boundingBox.y.toString() + 'px';
  touchProxy.style.marginLeft = boundingBox.x.toString() + 'px';
  touchProxy.style.zIndex = '9999999';

  document.querySelector('#noVNC div')?.appendChild(touchProxy);
}

export default function Home() {
  useEffect(() => {
    const target = document.getElementById('noVNC');

    if (target) setupNoVNC(target);
  }, []);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8081');

    ws.onopen = () => {
      fetch('http://localhost:3333/start')
        .then(() => {
          console.log('Session started');
        })
        .catch(console.error);
    };

    ws.onmessage = async (event) => {
      console.log(event);
      const boundingBox: BoundingBox = JSON.parse(await event.data.text());
      handleNewTouchProxy(boundingBox);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div id="noVNC"></div>
    </main>
  );
}
