import { trpc } from '../utils/trpc';

export function FakeOauthPage() {
  const startSession = trpc.private.startSession.useMutation();

  return (
    <div>
      <button
        onClick={() =>
          startSession.mutate({
            isMobile: false,
            viewport: { vh: window.innerHeight, vw: window.innerWidth },
          })
        }
      >
        Mutate
      </button>
    </div>
  );
}
