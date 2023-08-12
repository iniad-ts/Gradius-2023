import type { GameModel } from '$/commonTypesWithClient/models';
import { gameIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Game } from '@prisma/client';
import { z } from 'zod';

const toGameModel = (prismaGame: Game): GameModel => ({
  id: gameIdParser.parse(prismaGame.id),
  displayNumber: z.number().min(0).parse(prismaGame.displayNumber),
  createdAt: prismaGame.createdAt.getTime(),
});

export const gamesRepository = {
  save: async (game: GameModel): Promise<GameModel> => {
    const prismaGame = await prismaClient.game.upsert({
      where: { id: game.id },
      update: { displayNumber: game.displayNumber },
      create: {
        id: game.id,
        displayNumber: game.displayNumber,
        createdAt: new Date(game.createdAt),
      },
    });
    return toGameModel(prismaGame);
  },
  findAll: async (): Promise<GameModel[]> => {
    const prismaGames = await prismaClient.game.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return prismaGames.map(toGameModel);
  },
  find: async (): Promise<GameModel | null> => {
    const prismaGame = await prismaClient.game.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return prismaGame !== null ? toGameModel(prismaGame[0]) : null;
  },
};
