import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  return await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      password: 'password',
      confirmedAt: new Date(),
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
