import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  prisma.user.create({
    data: {
      email: 'test@gmail.com',
      password: 'test',
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
