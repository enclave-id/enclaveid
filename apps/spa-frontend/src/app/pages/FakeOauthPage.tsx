import React, { useCallback } from 'react';
import { trpc } from '../utils/trpc';
import { Button } from '../components/Button';
import { ChromePod } from '@prisma/client';

// TODO: maybe we wanna serve it from the tunnel and load it dynamically?
// https://guacamole.apache.org/doc/gug/writing-you-own-guacamole-app.html#updating-pom-xml
import Guacamole from '../utils/guacamole';

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

    guacClient.connect();

    // Mouse
    const mouse = new Guacamole.Mouse(guacClient.getDisplay().getElement());

    mouse.onmousedown =
      mouse.onmouseup =
      mouse.onmousemove =
        function (mouseState) {
          guacClient.sendMouseState(mouseState);
        };

    // Keyboard
    const keyboard = new Guacamole.Keyboard(document);

    keyboard.onkeydown = function (keysym) {
      guacClient.sendKeyEvent(1, keysym);
    };

    keyboard.onkeyup = function (keysym) {
      guacClient.sendKeyEvent(0, keysym);
    };
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
              connectGuac(pod.rdpPassword, pod.hostname, pod.chromePodId);
            });
        }}
      />
      <div
        id="display"
        ref={displayRef}
        style={{ height: '1000px', width: '1000px', display: 'block' }}
      ></div>
    </div>
  );
}
