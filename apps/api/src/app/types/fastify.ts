import '@fastify/jwt';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: { id: string };
  }
}

export interface UserCookie {
  id: string;
}
