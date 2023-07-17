import type { SessionsEnemiesModel } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';

export const sessionEnemyRepository = {
  save: async (sessionEnemy: SessionsEnemiesModel) => {
    await prismaClient.sessionEnemy.upsert({
      where: { id: sessionEnemy.id },
      update: { x: sessionEnemy.x, y: sessionEnemy.y, hitPoints: sessionEnemy.hit_point },
      create: {
        id: sessionEnemy.id,
        x: sessionEnemy.x,
        y: sessionEnemy.y,
        hitPoints: sessionEnemy.hit_point,
        collisionRadius: sessionEnemy.collision_radius,
        sessionId: sessionEnemy.session_id,
        enemyId: sessionEnemy.enemy_id,
      },
    });
  },
  findBySessionId: async (sessionId: string) => {
    return await prismaClient.sessionEnemy.findMany({
      where: { sessionId },
    });
  },
};
