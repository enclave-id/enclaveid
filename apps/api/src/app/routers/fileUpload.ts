import { authenticatedProcedure, router } from '../trpc';
import { AppContext } from '../context';
import { z } from 'zod';
import { generateSasUrl } from '../services/azureStorage';
import { TRPCError } from '@trpc/server';

export const fileUpload = router({
  getPresignedUrl: authenticatedProcedure
    .input(
      z.object({
        dataProvider: z.enum(['google', 'facebook']),
      })
    )
    .query(async (opts) => {
      const {
        user: { id: userId },
        prisma,
      } = opts.ctx as AppContext;

      const blobName = `${userId}_${opts.input.dataProvider}_${Date.now()}`;

      const url = await generateSasUrl(blobName)
        .then((url) => {
          prisma.takeoutFile.create({
            data: {
              blobName,
              user: { connect: { id: userId } },
              dataProvider: opts.input.dataProvider,
            },
          });

          return url;
        })
        .catch((error) => {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: error.message,
          });
        });

      return { url };
    }),
});
