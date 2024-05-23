import { authenticatedProcedure, router } from '../trpc';
import { observable } from '@trpc/server/observable';
import { z } from 'zod';
import { AppContext } from '../context';
import { TRPCError } from '@trpc/server';
import {
  ChromeUserEventData,
  ChromeUserEventEnum,
  InputOverlay,
  ParsedPayload,
  fromEventPayload,
} from '@enclaveid/shared';
import { connectFreePod } from '../services/fakeOauth/kubernetes';
import { prisma, redis } from '@enclaveid/backend';

export const fakeOauth = router({
  startSession: authenticatedProcedure
    .input(
      z.object({
        isMobile: z.boolean(),
        viewport: z.object({
          vh: z.number(),
          vw: z.number(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const {
        isMobile,
        viewport: { vh, vw },
      } = input;

      const {
        user: { id: userId },
      } = ctx as AppContext;

      return await connectFreePod(userId, isMobile, { vh, vw });
    }),
  podEvents: authenticatedProcedure.subscription(async (opts) => {
    const {
      user: { id: userId },
    } = opts.ctx as AppContext;

    const podName = (
      await prisma.chromePod.findFirst({
        where: {
          user: {
            id: userId,
          },
        },
      })
    )?.chromePodId;

    if (!podName) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User is not connected to a pod.',
      });
    }

    return (
      observable<ParsedPayload<ChromeUserEventEnum>>((emit) => {
        redis.subscribe(podName, (err, count) => {
          if (err) {
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: 'Failed to subscribe to redis channel: ' + err.message,
            });
          } else {
            console.log(
              `Subscribed successfully! Currently subscribed to ${count} channels.`,
            );
          }
        });

        redis.on('message', (podName, message) => {
          const { event, data } = fromEventPayload(message);

          emit.next({ event, data });

          if (event === ChromeUserEventEnum.LOGIN_SUCCESS) {
            emit.complete();
          }
        });

        return () => {
          redis.unsubscribe(podName);
        };
      })
    );
  }),
});
