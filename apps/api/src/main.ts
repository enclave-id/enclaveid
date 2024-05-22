import Fastify from 'fastify';
import { logger } from './app/services/logging';
import { initializePodsBuffer } from './app/services/fakeOauth/kubernetes';

// Plugins
import confidentiality from './app/plugins/confidentiality';
import cookie from './app/plugins/cookie';
import cors from './app/plugins/cors';
import helmet from './app/plugins/helmet';
import jwtAuth from './app/plugins/jwtAuth';
import prismaLifecycle from './app/plugins/prismaLifecycle';
import trpcAdapter from './app/plugins/trpcAdapter';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const server = Fastify({
  //@ts-expect-error idk
  logger: logger,
  maxParamLength: 5000,
});

server.register(confidentiality);
server.register(cookie);
server.register(cors);
server.register(helmet);
server.register(jwtAuth);
server.register(prismaLifecycle);
server.register(trpcAdapter);

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
