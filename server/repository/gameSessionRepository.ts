import type { GameSessionModel } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';

export const gameSessionRepository = {
  save: async (gameSession: GameSessionModel) => {
    await prismaClient.gameSession.upsert({
      where: { id: gameSession.id },
      update: { score: gameSession.score, endTime: gameSession.endTime },
      create: {
        id: gameSession.id,
        score: gameSession.score,
        startTime: gameSession.startTime,
        endTime: gameSession.endTime,
        stageId: gameSession.stageId,
        playerId: gameSession.PlayerId,
      },
    });
  },
  findByPlayerId: async (playerId: string) => {
    return await prismaClient.gameSession.findMany({
      where: { playerId },
      orderBy: { startTime: 'desc' },
    });
  },
};
