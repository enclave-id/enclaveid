'use client';

import React, { useState, useEffect, createContext } from 'react';

export const WebSocketContext = createContext<WebSocket | null>(null);

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [ws, setWs] = useState<WebSocket | null>(null);

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
    }
  }, [ws]);

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
}

export default WebSocketProvider;
