import { publicProcedure, router } from '../trpc';
import { observable } from '@trpc/server/observable';

export const guacamole = router({
  randomNumber: publicProcedure.subscription(() => {
    return observable<number>((emit) => {
      const int = setInterval(() => {
        emit.next(Math.random());
      }, 500);
      return () => {
        clearInterval(int);
      };
    });
  }),
});
