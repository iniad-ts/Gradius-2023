import type { UserId } from '$/commonTypesWithClient/branded';
import type { BulletModel } from '$/commonTypesWithClient/models';
import { BulletIdParser, UserIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Bullet } from '@prisma/client';
import { z } from 'zod';

const toBulletModel = (prismaBullet: Bullet): BulletModel => ({
  bulletId: BulletIdParser.parse(prismaBullet.bulletId),
  userId: UserIdParser.parse(prismaBullet.userId),
  pos: z
    .object({
      x: z.number(),
      y: z.number(),
    })
    .parse(prismaBullet.pos),
  attack: z.number().parse(prismaBullet.attack),
});

export const BulletRepository = {
  getBullets: async (): Promise<BulletModel[]> => {
    const prismaBullet = await prismaClient.bullet.findMany();
    return prismaBullet.map(toBulletModel);
  },
  save: async (bullet: BulletModel) => {
    await prismaClient.bullet.upsert({
      where: { bulletId: bullet.bulletId, userId: bullet.userId },
      update: {
        pos: bullet.pos,
        attack: bullet.attack,
      },
      create: {
        bulletId: bullet.bulletId,
        userId: bullet.userId,
        pos: bullet.pos,
        attack: bullet.attack,
      },
    });
  },
  read: async (bulletId: string, userId: UserId) => {
    const bullet = await prismaClient.bullet.findFirst({
      where: { bulletId, userId },
    });
    if (bullet === null || bullet === undefined) throw new Error("Player doesn't exist");
    return toBulletModel(bullet);
  },
  declare: async (bulletId: string, userId: UserId) => {
    await prismaClient.bullet.delete({
      where: { bulletId, userId },
    });
  },
};
