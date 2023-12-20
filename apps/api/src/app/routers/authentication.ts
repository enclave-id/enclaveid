import * as tpm from '../services/tpm';
import { z } from 'zod';
import { publicProcedure, router } from '../router';
import { AppContext } from '../context';
import { TRPCError } from '@trpc/server';

export const authentication = router({
  login: publicProcedure
    .input(
      z.object({
        encryptedCredentials: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { encryptedCredentials } = opts.input;
      const { prisma, setJwtCookie } = opts.ctx as AppContext;

      const { email, password, sessionKey } = JSON.parse(
        tpm.decrypt(encryptedCredentials)
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

      await prisma.session.upsert({
        where: { userId: user.id },
        update: { sessionKey },
        create: { userId: user.id, sessionKey },
      });

      setJwtCookie(user);

      return user;
    }),
  signup: publicProcedure
    .input(
      z.object({
        encryptedCredentials: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { encryptedCredentials } = opts.input;
      const { prisma } = opts.ctx as AppContext;

      const { email, password } = JSON.parse(tpm.decrypt(encryptedCredentials));

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

      const user = await prisma.user.create({
        data: {
          email,
          password,
        },
      });

      // TODO send confirmation email

      return user;
    }),
  confirmEmail: publicProcedure
    .input(
      z.object({
        confirmationCode: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { confirmationCode } = opts.input;
      const { prisma } = opts.ctx as AppContext;

      const user = await prisma.user.findUnique({
        where: { confirmationCode },
      });

      if (!user) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid confirmation code',
        });
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { confirmedAt: new Date() },
      });

      return user;
    }),
});
