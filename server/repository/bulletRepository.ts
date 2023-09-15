import { bulletIdParser, userIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Bullet } from '@prisma/client';
import { z } from 'zod';
import type { BulletId } from '../commonTypesWithClient/branded';
import type { BulletModel } from '../commonTypesWithClient/models';

const toBulletModel = (prismaBullet: Bullet): BulletModel => ({
  id: bulletIdParser.parse(prismaBullet.bulletId),
  direction: z
    .object({
      x: z.number(),
      y: z.number(),
    })
    .parse(prismaBullet.direction),
  createdPos: z
    .object({
      x: z.number(),
      y: z.number(),
    })
    .parse(prismaBullet.createdPos),
  createdAt: prismaBullet.createdAt.getTime(),
  side: z.enum(['left', 'right']).parse(prismaBullet.side),
  shooterId: userIdParser.parse(prismaBullet.shooterId),
});

export const bulletRepository = {
  create: async (bullet: BulletModel): Promise<BulletModel> => {
    const prismaBullet = await prismaClient.bullet.create({
      data: {
        bulletId: bullet.id,
        direction: bullet.direction,
        createdPos: bullet.createdPos,
        createdAt: new Date(bullet.createdAt),
        side: bullet.side,
        shooterId: bullet.shooterId,
      },
    });

    return toBulletModel(prismaBullet);
  },

  find: async (bulletId: BulletId): Promise<BulletModel | null> => {
    const prismaBullet = await prismaClient.bullet.findUnique({
      where: {
        bulletId,
      },
    });
    return prismaBullet !== null ? toBulletModel(prismaBullet) : null;
  },

  findAll: async (): Promise<BulletModel[]> => {
    const prismaBullet = await prismaClient.bullet.findMany();
    return prismaBullet.map(toBulletModel);
  },

  delete: async (bulletId: BulletId) => {
    await prismaClient.bullet.deleteMany({
      where: { bulletId },
    });
  },

  deleteByCreatedTime: async () => {
    const DELETE_TIME_SEC = 5;

    const boarderTime = new Date();
    boarderTime.setSeconds(boarderTime.getSeconds() - DELETE_TIME_SEC);

    await prismaClient.bullet.deleteMany({
      where: { createdAt: { lt: boarderTime } },
    });
  },
};
