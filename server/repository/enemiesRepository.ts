import type { EnemyModel } from '$/commonTypesWithClient/models';
import { enemyIdParser, gameIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Enemy } from '@prisma/client';
import { z } from 'zod';
import type { EnemyId } from './../commonTypesWithClient/branded';

const toEnemyRepository = (prismaEnemy: Enemy): EnemyModel => ({
  id: enemyIdParser.parse(prismaEnemy.id),
  createdAt: prismaEnemy.createdAt.getTime(),
  updateAt: prismaEnemy.updatedAt.getTime(),
  position: {
    x: prismaEnemy.posX,
    y: prismaEnemy.posY,
  },
  health: z.number().min(0).parse(prismaEnemy.health),
  speed: z.number().min(0).parse(prismaEnemy.speed),
  direction: z.number().min(0).max(360).parse(prismaEnemy.direction),
  type: z.number().parse(prismaEnemy.type),
  gameId: gameIdParser.parse(prismaEnemy.gameId),
});

export const enemiesRepository = {
  getAll: async (): Promise<EnemyModel[] | null> => {
    const prismaEnemies = await prismaClient.enemy.findMany();

    return prismaEnemies.map(toEnemyRepository);
  },
  getUnique: async (id: EnemyId): Promise<EnemyModel | null> => {
    const prismaEnemy = await prismaClient.enemy.findUnique({
      where: { id },
    });

    return prismaEnemy !== null ? toEnemyRepository(prismaEnemy) : null;
  },
  save: async (enemy: EnemyModel) => {
    await prismaClient.enemy.upsert({
      where: { id: enemy.id },
      update: {
        posX: enemy.position.x,
        posY: enemy.position.y,
        health: enemy.health,
        speed: enemy.speed,
        updatedAt: new Date(enemy.updateAt),
      },
      create: {
        id: enemy.id,
        posX: enemy.position.x,
        posY: enemy.position.y,
        health: enemy.health,
        speed: enemy.speed,
        direction: enemy.direction,
        createdAt: new Date(enemy.createdAt),
        updatedAt: new Date(enemy.updateAt),
        gameId: enemy.gameId,
        type: enemy.type,
      },
    });
  },
  delete: async (id: EnemyId) => {
    await prismaClient.enemy.delete({
      where: { id },
    });
  },
};
