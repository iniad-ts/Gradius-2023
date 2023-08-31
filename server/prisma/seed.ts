import { prismaClient } from '$/service/prismaClient';
import { randomUUID } from 'crypto';

async function main() {
  const count = await prismaClient.game.count();

  if (count > 0) return;

  await prismaClient.game.create({
    data: {
      id: randomUUID(),
      displayNumber: 1,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
