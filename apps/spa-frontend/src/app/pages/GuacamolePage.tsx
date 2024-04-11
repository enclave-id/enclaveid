import { useEffect } from 'react';
import { trpc } from '../utils/trpc';

export function GuacamolePage() {
  const startSession = trpc.private.startSession.useMutation();

  // trpc.private.randomNumber.useSubscription(undefined, {
  //   onData(n) {
  //     console.log(n);
  //   },
  // });

  useEffect(() => {
    startSession.mutate({ isMobile: false, viewport: { vh: 800, vw: 800 } });
  }, [startSession]);

  return (
    <div>
      <h1>Random number</h1>
    </div>
  );
}
