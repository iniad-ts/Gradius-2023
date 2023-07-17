import type { RoomModel } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';

export const gamerepository = {
  save: async (game: RoomModel) => {
    await prismaClient.game.upsert({
      where: { board: game.board },
      update: {
        x: game.x,
        y: game.y,
        board: game.board,
      },
      create: {
        x: game.x,
        y: game.y,
        board: game.board,
      },
    });
  },
};
