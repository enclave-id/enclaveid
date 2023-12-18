import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  return await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      password: 'password',
      confirmedAt: new Date(),
      userTraits: {
        create: {
          bigFive: {
            create: {
              openness: 0.5,
              conscientiousness: 0.4,
              extraversion: 0.3,
              agreeableness: 0.2,
              neuroticism: 0.1,
            },
          },
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
