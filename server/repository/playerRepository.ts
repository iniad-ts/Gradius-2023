import type { PlayerModel } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';

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
  },
};
