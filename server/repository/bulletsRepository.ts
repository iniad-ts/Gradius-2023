import type { BulletId } from '$/commonTypesWithClient/branded';
import type { BulletModel } from '$/commonTypesWithClient/models';
import { UserIdParser, bulletIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Bullet } from '@prisma/client';
import { z } from 'zod';
import { gameIdParser } from './../service/idParsers';

const toBulletModel = (prismaBullet: Bullet): BulletModel => ({
  id: bulletIdParser.parse(prismaBullet.id),
  createdAt: prismaBullet.createdAt.getTime(),
  updateAt: prismaBullet.updatedAt.getTime(),
  direction: z.number().min(0).max(360).parse(prismaBullet.direction),
  createdPosition: {
    x: prismaBullet.crearedPosX,
    y: prismaBullet.crearedPosY,
  },
  speed: z.number().min(0).parse(prismaBullet.speed),
  exists: prismaBullet.exists,
  gameId: gameIdParser.parse(prismaBullet.gameId),
  playerId: UserIdParser.parse(prismaBullet.playerId),
});

export const bulletsRepository = {
  getAll: async (): Promise<BulletModel[] | null> => {
    const prismaBullets = await prismaClient.bullet.findMany();

    return prismaBullets.map(toBulletModel);
  },
  getUnique: async (id: string): Promise<BulletModel | null> => {
    const prismaBullet = await prismaClient.bullet.findUnique({
      where: { id },
    });

    return prismaBullet && toBulletModel(prismaBullet);
  },
  save: async (bullet: BulletModel) => {
    await prismaClient.bullet.upsert({
      where: { id: bullet.id },
      update: {
        exists: bullet.exists,
        updatedAt: new Date(bullet.updateAt),
      },
      create: {
        id: bullet.id,
        crearedPosX: bullet.createdPosition.x,
        crearedPosY: bullet.createdPosition.y,
        direction: bullet.direction,
        speed: bullet.speed,
        exists: bullet.exists,
        createdAt: new Date(bullet.createdAt),
        updatedAt: new Date(bullet.updateAt),
        gameId: bullet.gameId,
        playerId: bullet.playerId,
      },
    });
  },
  delete: async (id: BulletId) => {
    await prismaClient.bullet.delete({
      where: { id },
    });
  },
};
