import { authenticatedProcedure, router } from '../trpc';
import { observable } from '@trpc/server/observable';
import { z } from 'zod';
import { AppContext } from '../context';
import { TRPCError } from '@trpc/server';
import {
  ChromeUserEventEnum,
  InputOverlay,
  fromEventPayload,
} from '@enclaveid/shared';
import { connectFreePod } from '../services/fakeOauth/kubernetes';
import { redis } from '@enclaveid/backend';

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
  inputOverlays: authenticatedProcedure.subscription((opts) => {
    const {
      user: { id: userId },
    } = opts.ctx as AppContext;

    return observable<InputOverlay>((emit) => {
      redis.subscribe(userId, (err, count) => {
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

      redis.on('message', (userId, message) => {
        const { event, data } = fromEventPayload(message);

        switch (event) {
          case ChromeUserEventEnum.NEW_BOUNDING_BOX:
            emit.next(data);
            break;
          case ChromeUserEventEnum.LOGIN_SUCCESS:
            emit.complete();
            break;
        }
      });

      return () => {
        redis.unsubscribe(userId);
      };
    });
  }),
});
