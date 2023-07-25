import type { GameModel } from '$/commonTypesWithClient/models';
import { gameIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Game } from '@prisma/client';
import { randomUUID } from 'crypto';

const toGameModel = (prismaGame: Game): GameModel => ({
  id: gameIdParser.parse(prismaGame.id),
  createdAt: prismaGame.createdAt.getTime(),
  updateAt: prismaGame.updatedAt.getTime(),
});

export const gameRepository = {
  get: async (): Promise<GameModel | null> => {
    const prismaGame = await prismaClient.game.findFirst();

    return prismaGame !== null ? toGameModel(prismaGame) : null;
  },
  create: async (): Promise<GameModel> => {
    const prismaGame = await prismaClient.game.create({
      data: {
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return toGameModel(prismaGame);
  },
};
