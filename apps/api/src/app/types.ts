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

  interface FastifyRequest {
    user: {
      id: string;
    };
  }
}

export interface BigFive {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}
