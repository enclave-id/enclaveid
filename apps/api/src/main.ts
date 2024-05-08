import Fastify from 'fastify';
import AutoLoad from '@fastify/autoload';
import path from 'path';
import { logger } from './app/services/logging';
import { initializePodsBuffer } from './app/services/fakeOauth/kubernetes';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const server = Fastify({
  logger: logger,
  maxParamLength: 5000,
});

// This loads all plugins defined in plugins
server.register(AutoLoad, {
  dir: path.join(__dirname, 'app', 'plugins'),
  //options: { ...opts },
});

// No need for static files for now...
// server.register(staticFiles, {
//   root: process.env.ASSETS_PATH,
//   prefix: '/assets/',
// });

// Start listening.
server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://${host}:${port}`);

    if (process.env.NODE_ENV === 'production')
      initializePodsBuffer()
        .then(() => {
          console.log('[ fakeOauth ] Pods buffer initialized');
        })
        .catch((err) => {
          console.error('[ fakeOauth ] Pods buffer initialization failed', err);
        });
  }
});
