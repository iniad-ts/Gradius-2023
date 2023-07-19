import type { GameSessionModel } from '$/commonTypesWithClient/models';
import { gameSessionIdParser, playerIdParser, stageIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { GameSession } from '@prisma/client';
import { z } from 'zod';
import { playerRepository } from './playerRepository';

const toGameSessionModel = (gameSession: GameSession): GameSessionModel => ({
  id: gameSessionIdParser.parse(gameSession.id),
  playerId: playerIdParser.parse(gameSession.playerId),
  score: z.number().parse(gameSession.score),
  startTime: z.date().parse(gameSession.startTime),
  stageId: stageIdParser.parse(gameSession.stageId),
  endTime: gameSession.endTime && z.date().parse(gameSession.endTime),
});

export const gameSessionRepository = {
  save: async (gameSession: GameSessionModel) => {
    const player = await playerRepository.findById(gameSession.playerId);
    if (!player) {
      throw new Error('player not found');
    }
    await prismaClient.gameSession.upsert({
      where: { id: gameSession.id },
      update: { score: gameSession.score },
      create: {
        id: gameSession.id,
        score: gameSession.score,
        startTime: gameSession.startTime,
        endTime: null,
        stageId: gameSession.stageId,
        playerId: player.id,
      },
    });
    return gameSession && toGameSessionModel(gameSession);
  },
  findLatestByPlayerId: async (playerId: string) => {
    const gameSession = await prismaClient.gameSession.findFirst({
      where: { playerId },
      orderBy: { startTime: 'desc' },
    });
    return gameSession && toGameSessionModel(gameSession);
  },
};
