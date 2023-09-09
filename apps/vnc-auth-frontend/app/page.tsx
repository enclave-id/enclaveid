'use client';

import { useContext, useEffect, useState } from 'react';
import { setupNoVNC } from './utils/noVnc';
import { handleNewTouchProxy } from './utils/touchProxy';
import { NextRouter, useRouter } from 'next/router';
import { WebSocketContext } from './providers/WebSocketProvider';

function handleWsMessage(vncClient: any, router: NextRouter) {
  return async function (event: MessageEvent) {
    const message = JSON.parse(await event.data.text());

    switch (message.type) {
      case 'finished':
        router.push('/consent');
        break;
      case 'boundingBox':
        document.getElementById('touchProxy')?.remove();
        handleNewTouchProxy(message.data, vncClient);
        break;
      default:
        console.error(`Message type ${message.type} not implemented.`);
    }
  };
}

export default function Home() {
  const [vncClient, setVncClient] = useState<any>();
  const router = useRouter();
  const ws = useContext(WebSocketContext);

  useEffect(() => {
    async function _setupNoVNC() {
      const target = document.getElementById('noVNC');

      if (target) {
        const vc = await setupNoVNC(target);
        setVncClient(vc);
      }
    }
    _setupNoVNC();
  }, []);

  useEffect(() => {
    if (ws && vncClient && router)
      ws.onmessage = handleWsMessage(vncClient, router);
  }, [ws, vncClient, router]);

  return (
    <main className="flex items-stretch flex-col justify-between">
      <div id="noVNC" className="w-screen h-screen"></div>
    </main>
  );
}
