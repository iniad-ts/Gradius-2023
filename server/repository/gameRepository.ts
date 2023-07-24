import type { GameModel } from '$/commonTypesWithClient/models';
import { gameIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Game } from '@prisma/client';

const toGameModel = (prismaGame: Game): GameModel => ({
  id: gameIdParser.parse(prismaGame.id),
  createdAt: prismaGame.createdAt.getTime(),
  updateAt: prismaGame.updatedAt.getTime(),
});

export const gameRepository = {
  get: async (): Promise<GameModel | null> => {
    const prismaGame = await prismaClient.game.findFirst();

    return prismaGame && toGameModel(prismaGame);
  },
};
