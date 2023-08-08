import type { RoomModel } from '$/commonTypesWithClient/models';
import { userIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { game as PrismaGame } from '@prisma/client';
import { z } from 'zod';

const toGameModel = (prismaRoom: PrismaGame): RoomModel => ({
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
  // findLatest: async (label: string | undefined): Promise<RoomModel | undefined> => {
  //   const gamelist = await prismaClient.game.findMany();
  //   const rooms = gamelist.find((game) => game.firebaseId === label);
  //   return rooms && toGameModel(rooms);
  // },
  findLatest: async (label: string | undefined): Promise<RoomModel | undefined> => {
    const gamelist = await prismaClient.game.findMany();
    const rooms: PrismaGame | undefined = gamelist.find((game) => game.firebaseId === label);

    if (rooms && typeof rooms.firebaseId === 'string') {
      return toGameModel(rooms);
    } else {
      return undefined;
    }
  },
};
