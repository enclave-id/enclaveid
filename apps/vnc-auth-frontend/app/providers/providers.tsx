'use client';

import WebSocketProvider from './WebSocketProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return <WebSocketProvider>{children}</WebSocketProvider>;
}
