import { PrismaClient } from '@prisma/client';
import { FastifyRequest, FastifyReply } from 'fastify';

type RequestDecorator = (
  req: FastifyRequest,
  reply: FastifyReply
) => Promise<void>;

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
    authenticate: RequestDecorator;
    decryptRequest: RequestDecorator;
    encryptResponse: RequestDecorator;
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: { id: string };
  }
}
