import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { AppContext } from '../context';
import { TRPCError } from '@trpc/server';
import { asymmetricDecrypt } from '../services/crypto/asymmetricNode';

export const authentication = router({
  login: publicProcedure
    .input(
      z.object({
        encryptedCredentials: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { encryptedCredentials } = opts.input;
      const { prisma, setJwtCookie, logger } = opts.ctx as AppContext;

      const { email, password, b64SessionKey } = JSON.parse(
        await asymmetricDecrypt(encryptedCredentials),
      );

      const user = await prisma.user.findUnique({
        where: { email, password, confirmedAt: { not: null } },
      });

      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid credentials',
        });
      }

      const sessionKey = Buffer.from(b64SessionKey, 'base64');

      await prisma.session.upsert({
        where: { userId: user.id },
        update: { sessionSecret: sessionKey },
        create: { userId: user.id, sessionSecret: sessionKey },
      });

      await setJwtCookie({ id: user.id });
    }),
  signup: publicProcedure
    .input(
      z.object({
        encryptedCredentials: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { encryptedCredentials } = opts.input;
      const { prisma } = opts.ctx as AppContext;

      const { email, password } = JSON.parse(
        await asymmetricDecrypt(encryptedCredentials),
      );

      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Email already in use',
        });
      }

      await prisma.user.create({
        data: {
          email,
          password,
          confirmedAt: new Date(), // TODO remove this and send confirmation email
          userTraits: {
            create: {},
          },
        },
      });
    }),
});
