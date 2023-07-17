import type { EnemyId } from '$/commonTypesWithClient/branded';
import { enemyIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Enemy } from '@prisma/client';
import { z } from 'zod';

export const ToEnemyModel = (enemy: Enemy) => ({
  id: enemyIdParser.parse(enemy.id),
  collisionRadius: z.number().parse(enemy.collisionRadius),
  score: z.number().parse(enemy.score),
});

export const enemyRepository = {
  getEnemy: async (enemyId: EnemyId) => {
    const enemy = await prismaClient.enemy.findFirst({
      where: { id: enemyId },
    });
    return enemy && ToEnemyModel(enemy);
  },
};
