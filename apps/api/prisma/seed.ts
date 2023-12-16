// eslint-disable-next-line @typescript-eslint/no-var-requires
const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();

async function main() {
  return await prisma.user.create({
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
