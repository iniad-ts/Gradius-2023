import type { EnemyModel } from '$/commonTypesWithClient/models';
import { enemyIdParser, gameIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Enemy } from '@prisma/client';
import { z } from 'zod';

const toEnemyModel = (prismaEnemy: Enemy): EnemyModel => ({
  id: enemyIdParser.parse(prismaEnemy.id),
  createdPosition: z
    .object({
      x: z.number().min(0),
      y: z.number().min(0),
    })
    .parse(prismaEnemy.createdPosition),
  type: z.number().min(0).parse(prismaEnemy.type),
  createdAt: prismaEnemy.createdAt.getTime(),
  gameId: gameIdParser.parse(prismaEnemy.gameId),
});

export const enemiesRepository = {
  save: async (enemy: EnemyModel): Promise<EnemyModel> => {
    const prismaEnemy = await prismaClient.enemy.create({
      data: {
        id: enemy.id,
        createdPosition: enemy.createdPosition,
        type: enemy.type,
        createdAt: new Date(enemy.createdAt),
        gameId: enemy.gameId,
      },
    });
    return toEnemyModel(prismaEnemy);
  },
  findAll: async (): Promise<EnemyModel[]> => {
    const prismaEnemies = await prismaClient.enemy.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return prismaEnemies.map(toEnemyModel);
  },
  find: async (id: string): Promise<EnemyModel | null> => {
    const prismaEnemy = await prismaClient.enemy.findUnique({ where: { id } });
    return prismaEnemy !== null ? toEnemyModel(prismaEnemy) : null;
  },
  delete: async (id: string): Promise<void> => {
    await prismaClient.enemy.delete({ where: { id } });
  },
};
