import type { Game } from '@prisma/client';
import { z } from 'zod';
import type { GameModel } from '../commonTypesWithClient/models';
import { gameIdParser } from '../service/idParsers';
import { prismaClient } from '../service/prismaClient';

const toGameModel = (prismaGame: Game): GameModel => ({
  id: gameIdParser.parse(prismaGame.id),
  displayNumber: z.number().min(0).parse(prismaGame.displayNumber),
});

export const gameRepository = {
  find: async (): Promise<GameModel | null> => {
    const prismaGame = await prismaClient.game.findFirst();
    return prismaGame !== null ? toGameModel(prismaGame) : null;
  },
  save: async (gameModel: GameModel): Promise<GameModel> => {
    const newGame: Game = await prismaClient.game.upsert({
      where: { id: gameModel.id },
      update: { displayNumber: gameModel.displayNumber },
      create: { id: gameModel.id, displayNumber: gameModel.displayNumber },
    });
    return toGameModel(newGame);
  },
};
