import React, { useCallback } from 'react';
import Guacamole from '../utils/guacamole';
import { trpc } from '../utils/trpc';
import { Button } from '../components/Button';
import { ChromePod } from '@prisma/client';

export function FakeOauthPage() {
  const connect = trpc.private.startSession.useMutation();
  const [podManifest, setPodManifest] = React.useState<ChromePod>(null);

  const displayRef = React.useRef<HTMLDivElement>(null);

  const connectGuac = useCallback((password, hostname, connectionId) => {
    const guacTunnel = new Guacamole.HTTPTunnel(
      'http://localhost:8080/tunnel',
      true,
      {
        password,
        hostname,
        connectionId,
      },
    );

    const guacClient = new Guacamole.Client(guacTunnel);

    guacClient.onerror = (err) => console.error('Guac client error', err);
    guacClient.onstatechange = (state) =>
      console.log('Guac client state', state);

    guacTunnel.onerror = (err) => console.error('Guac tunnel error', err);
    guacTunnel.onstatechange = (state) =>
      console.log('Guac tunnel state', state);

    const guacCanvas = guacClient.getDisplay().getElement();

    displayRef.current?.appendChild(guacCanvas);

    guacTunnel.connect();

    //guacClient.connect();
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
              setPodManifest(pod);
            });
        }}
      />
      <Button
        label="THEGUAC"
        onClick={() =>
          connectGuac(
            podManifest.rdpPassword,
            podManifest.hostname,
            podManifest.chromePodId,
          )
        }
      />
      <div
        id="display"
        ref={displayRef}
        style={{ height: '1000px', width: '1000px', display: 'block' }}
      ></div>
    </div>
  );
}
