import { z } from 'zod';

export const genericResponseSchema = {
  200: z.object({
    success: z.boolean(),
  }),
  400: z.object({
    error: z.string(),
  }),
};
