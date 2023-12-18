import { FastifyInstance } from 'fastify';
import * as tpm from '../services/tpm';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

const schema = {
  querystring: z.object({
    encryptedChallenge: z.string(),
  }),
  response: {
    200: z.object({
      jwt: z.string(),
      publicKey: z.string(),
    }),
  },
};

export default async function (fastify: FastifyInstance) {
  fastify
    .withTypeProvider<ZodTypeProvider>()
    .get('/attestation', { schema }, async (request, reply) => {
      const { encryptedChallenge } = request.query;

      reply.send({
        jwt: tpm.getAttestation(encryptedChallenge),
        publicKey: tpm.getPublicKey(),
      });
    });
}
