import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import busboy from '@fastify/busboy';
import { streamingUpload } from '../services/azureStorage';

export default fp(async function (fastify: FastifyInstance) {
  fastify.post('/upload/octet-stream', (request, reply) => {
    const bb = busboy({
      headers: {
        'content-type': request.headers['content-type'],
        ...request.headers,
      },
    });

    bb.on('file', async (name, file, filename) => {
      streamingUpload(filename, file)
        .then(() => {
          reply.send({
            message: `File ${filename} uploaded to Azure Blob Storage`,
          });
        })
        .catch((error) => {
          reply
            .code(500)
            .send({ error: `Error uploading file: ${error.message}` });
        });
    });

    request.raw.pipe(bb);
  });
});
