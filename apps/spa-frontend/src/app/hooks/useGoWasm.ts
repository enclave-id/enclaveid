import { useEffect, useState } from 'react';
import '../utils/wasm_exec.js';

// Load a Go WASM binary from a URL
export function useGoWasm(wasmURL: string) {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadWasm() {
      try {
        const go = new Go();
        const wasmResponse = await fetch(wasmURL);
        const wasmBinary = await wasmResponse.arrayBuffer();
        const { instance } = await WebAssembly.instantiate(
          wasmBinary,
          go.importObject,
        );

        go.run(instance);
        setIsReady(true);
      } catch (err) {
        setError(err as Error);
        console.error('Error loading Wasm:', err);
      }
    }

    loadWasm();
  }, [wasmURL]);

  return { isReady, error };
}
