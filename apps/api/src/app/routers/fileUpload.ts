import { publicProcedure, router } from '../trpc';
import { AppContext } from '../context';
import { z } from 'zod';
import { generateSasUrl } from '../services/azureStorage';

export const fileUpload = router({
  getPresignedUrl: publicProcedure
    .input(
      z.object({
        dataProvider: z.enum(['google', 'facebook']),
      })
    )
    .query(async (opts) => {
      const userId = (opts.ctx as AppContext).user.id;

      const blobName = `${userId}_${opts.input.dataProvider}_${Date.now()}`;

      const url = await generateSasUrl(blobName);

      return { url };
    }),
});
