import type { RoomModel } from '$/commonTypesWithClient/models';
import { userIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { game } from '@prisma/client';
import { z } from 'zod';

// type game = {
//   firebaseId: string;
//   position: { x: number; y: number };
// };

const toGameModel = (prismaRoom: game): RoomModel => ({
  Id: userIdParser.parse(prismaRoom.firebaseId),
  position: z
    .object({
      x: z.number(),
      y: z.number(),
    })
    .parse(prismaRoom.position),
});

export const handlerrepository = {
  save: async (game: RoomModel) => {
    await prismaClient.game.upsert({
      where: { firebaseId: game.Id },
      update: { position: game.position },
      create: { firebaseId: game.Id, position: game.position },
    });
  },
  findLatest: async (label: string | undefined): Promise<RoomModel | undefined> => {
    const gamelist = await prismaClient.game.findMany();
    const rooms = gamelist.find((game) => game.firebaseId === label);
    return rooms && toGameModel(rooms);
  },
};
