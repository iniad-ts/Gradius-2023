import type { EnemyModel } from '$/commonTypesWithClient/models';
import { enemyIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Enemy } from '@prisma/client';
import { z } from 'zod';
import type { EnemyId } from '../commonTypesWithClient/branded';

const toEnemyModel = (prismaEnemy: Enemy): EnemyModel => ({
  id: enemyIdParser.parse(prismaEnemy.enemyId),
  direction: z
    .object({
      x: z.number(),
      y: z.number(),
    })
    .parse(prismaEnemy.direction),
  createdPos: z
    .object({
      x: z.number(),
      y: z.number(),
    })
    .parse(prismaEnemy.createdPos),
  createdAt: prismaEnemy.createdAt.getTime(),
  type: z.number().min(0).parse(prismaEnemy.type),
});

export const enemyRepository = {
  create: async (enemy: EnemyModel): Promise<EnemyModel> => {
    const prismaEnemy = await prismaClient.enemy.create({
      data: {
        enemyId: enemy.id,
        direction: enemy.direction,
        createdPos: enemy.createdPos,
        createdAt: new Date(enemy.createdAt),
        type: enemy.type,
      },
    });

    return toEnemyModel(prismaEnemy);
  },

  find: async (enemyId: EnemyId): Promise<EnemyModel | null> => {
    const enemy = await prismaClient.enemy.findUnique({
      where: { enemyId },
    });

    return enemy !== null ? toEnemyModel(enemy) : null;
  },

  findAll: async (): Promise<EnemyModel[]> => {
    const enemies = await prismaClient.enemy.findMany();
    return enemies.map(toEnemyModel);
  },

  delete: async (enemyId: EnemyId) => {
    await prismaClient.enemy.deleteMany({
      where: {
        enemyId,
      },
    });
  },
};
