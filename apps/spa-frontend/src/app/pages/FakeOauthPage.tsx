import React, { useCallback } from 'react';
import Guacamole from '../utils/guacamole';
import { trpc } from '../utils/trpc';
import { Button } from '../components/Button';

export function FakeOauthPage() {
  const connect = trpc.private.startSession.useMutation();

  const displayRef = React.useRef<HTMLDivElement>(null);

  const connectGuac = useCallback((password, connectionId) => {
    const guacTunnel = new Guacamole.HTTPTunnel(
      'http://localhost:8080/tunnel',
      true,
      {
        password,
        connectionId,
      },
    );

    const guacClient = new Guacamole.Client(guacTunnel);

    const guacCanvas = guacClient.getDisplay().getElement();

    displayRef.current?.appendChild(guacCanvas);

    guacClient.connect();
  }, []);

  return (
    <div>
      <Button
        label="Connect"
        onClick={() => {
          connect
            .mutateAsync({
              isMobile: false,
              viewport: {
                vh: 1080,
                vw: 1920,
              },
            })
            .then((pod) => {
              connectGuac(pod.rdpPassword, pod.chromePodId);
            });
        }}
      />
      <div id="display" ref={displayRef}></div>
    </div>
  );
}
