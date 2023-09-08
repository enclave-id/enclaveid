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
      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );

      ws.onopen = () => {
        fetch(
          `http://${process.env.NEXT_PUBLIC_HOST_ADDRESS}:3333/start?` +
            new URLSearchParams({
              vh: vh.toString(),
              vw: vw.toString(),
            })
        )
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
