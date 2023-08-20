import type { UserId } from '$/commonTypesWithClient/branded';
import type { PlayerModel } from '$/commonTypesWithClient/models';
import { userIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Player } from '@prisma/client';
import { z } from 'zod';

const toPlayerModel = (prismaPlayer: Player): PlayerModel => ({
  userId: userIdParser.parse(prismaPlayer.userId),
  name: z.string().parse(prismaPlayer.name),
  score: z.number().parse(prismaPlayer.score),
  vector: z
    .object({
      x: z.number(),
      y: z.number(),
    })
    .parse(prismaPlayer.vector),
  Items: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .array()
    .parse(prismaPlayer.Item),
  side: z.literal('left').or(z.literal('right')).parse(prismaPlayer.side),
});

const playerRepository = {
  save: async (player: PlayerModel) => {
    const prismaPlayer = await prismaClient.player.upsert({
      where: {
        userId: player.userId,
      },
      update: {
        name: player.name,
        score: player.score,
        vector: player.vector,
        Item: player.Items,
        side: player.side,
      },
      create: {
        userId: player.userId,
        name: player.name,
        score: player.score,
        vector: player.vector,
        Item: player.Items,
        side: player.side,
      },
    });
    return toPlayerModel(prismaPlayer);
  },
  getPlayer: async (userId: UserId) => {
    const player = await prismaClient.player.findUnique({
      where: {
        userId,
      },
    });
    if (!player) {
      return null;
    }
    return toPlayerModel(player);
  },
  getPlayers: async () => {
    const players = await prismaClient.player.findMany();
    return players.map(toPlayerModel);
  },
  deletePlayer: async (userId: UserId) => {
    const player = await prismaClient.player.findUnique({
      where: {
        userId,
      },
    });
    if (!player) return;

    await prismaClient.player.delete({
      where: {
        userId,
      },
    });
  },
};
