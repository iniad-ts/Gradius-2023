import type { SessionsEnemiesId } from '$/commonTypesWithClient/branded';
import type { SessionsEnemiesModel } from '$/commonTypesWithClient/models';
import { enemyIdParser, gameSessionIdParser, sessionsEnemiesIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { SessionEnemy } from '@prisma/client';
import { z } from 'zod';

const toSessionEnemyModel = (sessionEnemy: SessionEnemy) => ({
  id: sessionsEnemiesIdParser.parse(sessionEnemy.id),
  x: z.number().parse(sessionEnemy.x),
  y: z.number().parse(sessionEnemy.y),
  hitPoint: z.number().parse(sessionEnemy.hitPoints),
  collisionRadius: z.number().parse(sessionEnemy.collisionRadius),
  sessionId: gameSessionIdParser.parse(sessionEnemy.sessionId),
  enemyId: enemyIdParser.parse(sessionEnemy.enemyId),
});

export const sessionEnemyRepository = {
  save: async (sessionEnemy: SessionsEnemiesModel) => {
    await prismaClient.sessionEnemy.upsert({
      where: { id: sessionEnemy.id },
      update: { x: sessionEnemy.x, y: sessionEnemy.y, hitPoints: sessionEnemy.hitPoint },
      create: {
        id: sessionEnemy.id,
        x: sessionEnemy.x,
        y: sessionEnemy.y,
        hitPoints: sessionEnemy.hitPoint,
        collisionRadius: sessionEnemy.collisionRadius,
        sessionId: sessionEnemy.sessionId,
        enemyId: sessionEnemy.enemyId,
      },
    });
  },
  findBySessionId: async (sessionId: string) => {
    const sessions = await prismaClient.sessionEnemy.findMany({
      where: { sessionId },
    });
    return sessions.map(toSessionEnemyModel);
  },
  //クライアント側で削除した敵の情報をサーバー側でも削除する想定
  deleteEnemy: async (id: SessionsEnemiesId) => {
    const enemy = await prismaClient.sessionEnemy.findUnique({
      where: { id },
    });
    await prismaClient.sessionEnemy.delete({
      where: { id },
    });
    return enemy && toSessionEnemyModel(enemy);
  },
};
