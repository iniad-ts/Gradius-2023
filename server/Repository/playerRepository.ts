import type { UserId } from '$/commonTypesWithClient/branded';
import type { PlayerModel } from '$/commonTypesWithClient/models';

import { UserIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Player } from '@prisma/client';
import { z } from 'zod';

const toPlayerModel = (prismaPlayer: Player): PlayerModel => ({
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
  name: z.string().parse(prismaPlayer.name),
});

export const playerRepository = {
  getPlayers: async (): Promise<PlayerModel[]> => {
    const prismaPlayer = await prismaClient.player.findMany();
    return prismaPlayer.map(toPlayerModel);
  },
  save: async (player: PlayerModel) => {
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
        name: player.name,
      },
    });
  },
  read: async (userId: UserId) => {
    const player = await prismaClient.player.findFirst({
      where: { userId },
    });
    if (player === null || player === undefined) throw new Error("Player doesn't exist");
    return toPlayerModel(player);
  },
  declare: async (userId: UserId) => {
    await prismaClient.player.delete({
      where: { userId },
    });
  },
};
