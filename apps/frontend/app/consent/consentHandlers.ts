export function handleConsent(ws: WebSocket, consent: boolean) {
  return () => {
    ws.send(
      Buffer.from(
        JSON.stringify({
          type: 'consent',
          data: consent,
        })
      )
    );
    window.close();
  };
}
