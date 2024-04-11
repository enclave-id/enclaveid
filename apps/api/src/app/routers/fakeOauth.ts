import { authenticatedProcedure, router } from '../trpc';
import { observable } from '@trpc/server/observable';
import { BoundingBox } from 'puppeteer';
import { z } from 'zod';
import { eventEmitter } from '../services/fakeOauth/viewportEvents';
import { startPuppeteerSession } from '../services/fakeOauth/puppeteer';

interface InputOverlay {
  inputId: string;
  boundingBox: BoundingBox;
}

export const fakeOauth = router({
  startSession: authenticatedProcedure
    .input(
      z.object({
        isMobile: z.boolean(),
        viewport: z
          .object({
            vh: z.number(),
            vw: z.number(),
          })
          .required(),
      }),
    )
    .mutation(async ({ input }) => {
      const { isMobile, viewport } = input;

      return await startPuppeteerSession(isMobile, viewport);
    }),
  inputOverlays: authenticatedProcedure.subscription(() => {
    return observable<Array<InputOverlay>>((emit) => {
      const handleInputOverlays = (inputOverlays: Array<InputOverlay>) =>
        emit.next(inputOverlays);

      eventEmitter.on('inputOverlays', handleInputOverlays);

      return () => {
        eventEmitter.off('inputOverlays', handleInputOverlays);
      };
    });
  }),
});
