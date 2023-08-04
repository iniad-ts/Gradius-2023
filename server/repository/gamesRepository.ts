import type { GameId } from '$/commonTypesWithClient/branded';
import type { GameModel } from '$/commonTypesWithClient/models';
import { gameIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Game } from '@prisma/client';
import { z } from 'zod';

const toGameModel = (prismaGame: Game): GameModel => ({
  id: gameIdParser.parse(prismaGame.id),
  displays: z.array(z.string()).parse(prismaGame.displays),
  createdAt: prismaGame.createdAt.getTime(),
});

export const gamesRepository = {
  save: async (game: GameModel): Promise<GameModel> => {
    const prismaGame = await prismaClient.game.upsert({
      where: { id: game.id },
      update: { displays: game.displays },
      create: {
        id: game.id,
        displays: game.displays,
        createdAt: new Date(game.createdAt),
      },
    });
    return toGameModel(prismaGame);
  },
  find: async (id: GameId): Promise<GameModel | null> => {
    const prismaGame = await prismaClient.game.findUnique({ where: { id } });
    return prismaGame !== null ? toGameModel(prismaGame) : null;
  },
};
