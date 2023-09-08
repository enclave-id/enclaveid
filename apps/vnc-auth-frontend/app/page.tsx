'use client';

import { useEffect, useState } from 'react';
import { setupNoVNC } from './utils/noVnc';
import { BoundingBox } from 'puppeteer';
import { handleNewTouchProxy } from './utils/touchProxy';

export default function Home() {
  const [vncClient, setVncClient] = useState<any>();
  const [ws, setWs] = useState<WebSocket>();

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
    setWs(new WebSocket(`ws://${process.env.NEXT_PUBLIC_HOST_ADDRESS}:8081`));
  }, []);

  useEffect(() => {
    if (ws) {
      ws.onopen = () => {
        fetch(`http://${process.env.NEXT_PUBLIC_HOST_ADDRESS}:3333/start`)
          .then(() => {
            console.log('Session started');
          })
          .catch(console.error);
      };

      if (vncClient)
        ws.onmessage = async (event) => {
          const boundingBox: BoundingBox = JSON.parse(await event.data.text());
          handleNewTouchProxy(boundingBox, vncClient);
        };
    }
  }, [ws, vncClient]);

  return (
    <main className="flex items-stretch flex-col justify-between">
      <div id="noVNC" className="w-screen h-screen"></div>
    </main>
  );
}
