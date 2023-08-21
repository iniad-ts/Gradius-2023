import { bulletIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Bullet } from '@prisma/client';
import { z } from 'zod';
import type { BulletId } from '../commonTypesWithClient/branded';
import type { BulletModel } from '../commonTypesWithClient/models';

const toBulletModel = (prismaBullet: Bullet): BulletModel => ({
  bulletId: bulletIdParser.parse(prismaBullet.bulletId),
  shooterId: z.string().parse(prismaBullet.shooterId),
  power: z.number().min(0).parse(prismaBullet.power),
  pos: z
    .object({
      x: z.number(),
      y: z.number(),
    })
    .parse(prismaBullet.pos),

  vector: z
    .object({
      x: z.number(),
      y: z.number(),
    })
    .parse(prismaBullet.vector),
  type: z.number().parse(prismaBullet.type),
  side: z.enum(['left', 'right']).parse(prismaBullet.side),
});

export const bulletRepository = {
  save: async (bullet: BulletModel): Promise<BulletModel> => {
    const prismaBullet = await prismaClient.bullet.upsert({
      where: {
        bulletId: bullet.bulletId,
      },
      update: {
        power: bullet.power,
        vector: bullet.vector,
        pos: bullet.pos,
        type: bullet.type,
        side: bullet.side,
      },
      create: {
        bulletId: bullet.bulletId,
        shooterId: bullet.shooterId,
        power: bullet.power,
        vector: bullet.vector,
        pos: bullet.pos,
        type: bullet.type,
        side: bullet.side,
      },
    });
    return toBulletModel(prismaBullet);
  },
  find: async (bulletId: BulletId): Promise<BulletModel | null> => {
    const bullet = await prismaClient.bullet.findUnique({
      where: {
        bulletId,
      },
    });
    if (bullet === null) return null;
    return toBulletModel(bullet);
  },
  findAll: async (): Promise<BulletModel[]> => {
    const bullets = await prismaClient.bullet.findMany();
    return bullets.length > 0 ? bullets.map(toBulletModel) : [];
  },
  delete: async (bulletId: BulletId) => {
    const bullet = await prismaClient.bullet.findUnique({
      where: {
        bulletId,
      },
    });
    if (bullet === null) return;
    await prismaClient.bullet.delete({
      where: {
        bulletId,
      },
    });
  },
};
