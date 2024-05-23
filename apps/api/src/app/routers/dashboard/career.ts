import { prisma } from '@enclaveid/backend';
import { AppContext } from '../../context';
import { authenticatedProcedure, router } from '../../trpc';

export const career = router({
  getCareerTraits: authenticatedProcedure.query(async (opts) => {
    const {
      user: { id: userId },
    } = opts.ctx as AppContext;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userTraits: {
          include: {
            riasec: {
              orderBy: {
                createdAt: 'desc',
              },
              take: 1,
            },
          },
        },
      },
    });

    return {
      riasec: user?.userTraits?.riasec[0],
    };
  }),
});
