import type { EnemyModel } from '$/commonTypesWithClient/models';
import { enemyIdParser } from '$/service/idParsers';
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
  deletedAt: prismaEnemy.deletedAt?.getTime() ?? null,
});

export const enemiesRepository = {
  create: async (enemy: EnemyModel) => {
    await prismaClient.enemy.create({
      data: {
        id: enemy.id,
        createdPosition: enemy.createdPosition,
        type: enemy.type,
        createdAt: new Date(enemy.createdAt),
      },
    });
  },
  update: async (enemyId: string, deletedAt: Date | null): Promise<EnemyModel> => {
    const prismaEnemy = await prismaClient.enemy.update({
      where: { id: enemyId },
      data: { deletedAt },
    });
    return toEnemyModel(prismaEnemy);
  },
  findAll: async (): Promise<EnemyModel[]> => {
    const prismaEnemies = await prismaClient.enemy.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: { createdAt: 'desc' },
    });
    return prismaEnemies.map(toEnemyModel);
  },
  find: async (id: string): Promise<EnemyModel | null> => {
    const prismaEnemy = await prismaClient.enemy.findUnique({ where: { id } });
    return prismaEnemy !== null ? toEnemyModel(prismaEnemy) : null;
  },
  findNotNull: async () => {
    const res = await prismaClient.enemy.findMany({
      where: {
        NOT: {
          deletedAt: null,
        },
      },
    });
    return res.map(toEnemyModel);
  },
  findNull: async () => {
    const res = await prismaClient.enemy.findMany({ where: { deletedAt: null } });
    return res.map(toEnemyModel);
  },
  findType: async (type: number) => {
    const res = await prismaClient.enemy.findMany({
      where: {
        AND: {
          type,
          deletedAt: null,
        },
      },
    });
    return res.map(toEnemyModel);
  },
};
