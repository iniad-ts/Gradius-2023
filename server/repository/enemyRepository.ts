import type { EnemyId } from '$/commonTypesWithClient/branded';
import type { EnemyModel } from '$/commonTypesWithClient/models';
import { enemyIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Enemy } from '@prisma/client';
import { z } from 'zod';

const toEnemyModel = (prismaEnemy: Enemy): EnemyModel => ({
  enemyId: enemyIdParser.parse(prismaEnemy.enemyId),
  score: z.number().min(0).parse(prismaEnemy.score),
  vector: z
    .object({
      x: z.number(),
      y: z.number(),
    })
    .parse(prismaEnemy.vector),
  pos: z
    .object({
      x: z.number(),
      y: z.number(),
    })
    .parse(prismaEnemy.pos),
  type: z.number().min(0).parse(prismaEnemy.type),
});

export const enemyRepository = {
  save: async (enemy: EnemyModel) => {
    const prismaEnemy = await prismaClient.enemy.upsert({
      where: {
        enemyId: enemy.enemyId,
      },
      update: {
        score: enemy.score,
        vector: enemy.vector,
      },
      create: {
        enemyId: enemy.enemyId,
        score: enemy.score,
        pos: enemy.pos,
        vector: enemy.vector,
        type: enemy.type,
      },
    });
    return toEnemyModel(prismaEnemy);
  },
  find: async (enemyId: EnemyId) => {
    const enemy = await prismaClient.enemy.findUnique({
      where: {
        enemyId,
      },
    });
    if (!enemy) {
      return null;
    }
    return toEnemyModel(enemy);
  },
  findAll: async () => {
    const enemies = await prismaClient.enemy.findMany();
    return enemies.map(toEnemyModel);
  },
  delete: async (enemyId: EnemyId) => {
    await prismaClient.enemy.delete({
      where: {
        enemyId,
      },
    });
  },
};
