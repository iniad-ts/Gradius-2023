import { prismaClient } from '$/service/prismaClient';

async function main() {
  console.log('Start seeding ...');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
