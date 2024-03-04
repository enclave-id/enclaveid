/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/spa-frontend',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    react(),
    nxViteTsPaths(),
    nodePolyfills({
      // @ts-expect-error: Type 'string' is not assignable to type 'never'.
      include: ['buffer', 'stream'],
      globals: {
        Buffer: true,
      },
    }),
  ],

  build: {
    outDir: '../../dist/apps/spa-frontend',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    sourcemap: true,
  },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/spa-frontend',
      provider: 'v8',
    },
  },
});
