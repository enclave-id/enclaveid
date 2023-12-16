import { FastifyInstance } from 'fastify';
import * as tpm from '../services/tpm';

export default async function (fastify: FastifyInstance) {
  fastify.get<{
    Body: { encryptedChallenge: string };
  }>('/attestation', async (request, reply) => {
    const { encryptedChallenge } = request.body;

    reply.send({
      jwt: tpm.getAttestation(encryptedChallenge),
      publicKey: tpm.getPublicKey(),
    });
  });
}
