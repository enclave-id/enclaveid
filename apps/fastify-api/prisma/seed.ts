/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  // Load JSON data
  const filePath = path.join(__dirname, 'MyActivity.json');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const records = JSON.parse(rawData);

  // Create a User
  const user = await prisma.user.create({
    data: {
      name: 'test',
    },
  });

  console.log(`Created User with ID: ${user.id}`);

  // Create an Account linked to the User
  const account = await prisma.account.create({
    data: {
      userId: user.id,
      name: 'Google',
      email: 'test@gmail.com',
    },
  });

  console.log(`Created Account with ID: ${account.id} for User ID: ${user.id}`);

  // Prepare datapoints for batch insertion
  const datapoints = records.map((record) => ({
    type: 'search',
    time: new Date(record.time),
    data: record.title,
    accountId: account.id,
  }));

  // Use createMany to batch-insert datapoints
  await prisma.datapoint.createMany({
    data: datapoints,
    skipDuplicates: true, // optional, skips records with duplicate values based on constraints
  });

  console.log('Populated Datapoints.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
