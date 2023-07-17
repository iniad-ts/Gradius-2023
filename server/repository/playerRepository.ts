import type { PlayerId } from '$/commonTypesWithClient/branded';
import type { PlayerModel } from '$/commonTypesWithClient/models';
import { playerIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Player } from '@prisma/client';
import { z } from 'zod';

const toPlayerModel = (player: Player): PlayerModel => ({
  id: playerIdParser.parse(player.id),
  name: z.string().parse(player.name),
  x: z.number().parse(player.x),
  y: z.number().parse(player.y),
});

export const playerRepository = {
  save: async (player: PlayerModel) => {
    await prismaClient.player.upsert({
      where: { id: player.id },
      update: { x: player.x, y: player.y },
      create: {
        id: player.id,
        name: player.name,
        x: player.x,
        y: player.y,
      },
    });
    return Boolean(player) && toPlayerModel(player);
  },
  findById: async (id: PlayerId) => {
    const player = await prismaClient.player.findUnique({
      where: { id },
    });
    return player && toPlayerModel(player);
  },
};
