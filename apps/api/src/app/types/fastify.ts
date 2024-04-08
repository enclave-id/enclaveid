import '@fastify/jwt';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: UserCookie;
  }
}

export interface UserCookie {
  id: string;
}
