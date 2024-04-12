import { authenticatedProcedure, router } from '../trpc';
import { observable } from '@trpc/server/observable';
import { BoundingBox } from 'puppeteer';
import { z } from 'zod';
import {
  eventEmitter,
  startPuppeteerSession,
} from '../services/fakeOauth/puppeteer';

interface InputOverlay {
  inputId: string;
  boundingBox: BoundingBox;
}

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
    .mutation(async ({ input }) => {
      const {
        isMobile,
        viewport: { vh, vw },
      } = input;

      return await startPuppeteerSession(isMobile, { vh, vw });
    }),
  inputOverlays: authenticatedProcedure.subscription(() => {
    return observable<Array<InputOverlay>>((emit) => {
      const handleInputOverlays = (inputOverlays: Array<InputOverlay>) =>
        emit.next(inputOverlays);

      const handleFinishedLogin = () => emit.complete();

      eventEmitter.on('inputOverlays', handleInputOverlays);
      eventEmitter.on('finishedLogin', handleFinishedLogin);

      return () => {
        eventEmitter.off('inputOverlays', handleInputOverlays);
        eventEmitter.off('finishedLogin', handleFinishedLogin);
      };
    });
  }),
});
