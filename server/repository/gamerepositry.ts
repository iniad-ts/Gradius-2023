import type { RoomModel } from '$/commonTypesWithClient/models';
import { UserIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { game } from '@prisma/client';
import { z } from 'zod';

const toGameModel = (prismaRoom: game): RoomModel => ({
  Id: UserIdParser.parse(prismaRoom.firebaseId),
  // x: prismaRoom.x,
  // y: prismaRoom.y,
  position: z
    .object({
      x: z.number(),
      y: z.number(),
    })
    .parse(prismaRoom.position),
});

export const gamerepository = {
  save: async (game: RoomModel) => {
    await prismaClient.game.upsert({
      where: { firebaseId: game.Id },
      update: {
        // x: game.x,
        // y: game.y,
        position: game.position,
        // board: game.board,
      },
      create: {
        firebaseId: game.Id,
        // x: game.x,
        // y: game.y,
        position: game.position,
        // board: game.board,
      },
    });
  },
  findLatest: async (label: string | undefined): Promise<RoomModel | undefined> => {
    const gamelist = await prismaClient.game.findMany();
    const rooms = gamelist.find((game) => game.firebaseId === label);
    return rooms && toGameModel(rooms);
  },
};
