import type { UserId } from '$/commonTypesWithClient/branded';
import type { playerModel } from '$/commonTypesWithClient/models';
import { UserIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Player } from '@prisma/client';
import { z } from 'zod';

const toPlayerModel = (prismaPlayer: Player): playerModel => ({
  userId: UserIdParser.parse(prismaPlayer.userId),
  pos: z
    .object({
      x: z.number(),
      y: z.number(),
    })
    .parse(prismaPlayer.pos),
  speed: z.number().parse(prismaPlayer.speed),
  hp: z.number().parse(prismaPlayer.hp),
  radius: z.number().parse(prismaPlayer.radius),
  score: z.number().parse(prismaPlayer.score),
});

export const playerRepository = {
  getPlayers: async (): Promise<playerModel[]> => {
    const prismaPlayer = await prismaClient.player.findMany();
    return prismaPlayer.map(toPlayerModel);
  },
  save: async (player: playerModel) => {
    await prismaClient.player.upsert({
      where: { userId: player.userId },
      update: {
        pos: player.pos,
        speed: player.speed,
        hp: player.hp,
        radius: player.radius,
        score: player.score,
      },
      create: {
        userId: player.userId,
        pos: player.pos,
        speed: player.speed,
        hp: player.hp,
        radius: player.radius,
        score: player.score,
      },
    });
  },
  read: async (userId: string) => {
    const player = await prismaClient.player.findFirst({
      where: { userId },
    });
    if (!player) throw new Error("Player doesn't exist");
    return toPlayerModel(player);
  },
  declare: async (userId: UserId) => {
    await prismaClient.player.delete({
      where: { userId },
    });
  },
};
