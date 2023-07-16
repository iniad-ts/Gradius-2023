import type { PlayerId, StageId } from '$/commonTypesWithClient/branded';
import type { GameSessionModel } from '$/commonTypesWithClient/models';
import { gameSessionRepository } from '$/repository/gameSessionRepository';
import { gameSessionIdParser } from '$/service/idParsers';
import assert from 'assert';
import { randomUUID } from 'crypto';

export const gameSessionUsecase = {
  create: async (playerId: PlayerId, stageId: StageId) => {
    const gameSession = await gameSessionRepository.save({
      id: gameSessionIdParser.parse(randomUUID()),
      score: 0,
      startTime: new Date(),
      endTime: null,
      stageId,
      playerId,
    });
    return gameSession;
  },
  endgame: async (playerId: PlayerId): Promise<GameSessionModel> => {
    const gameSession = await gameSessionRepository.findByPlayerId(playerId);
    assert(gameSession, 'gameSession not found');
    if (gameSession.endTime === null) {
      const newGameSession: GameSessionModel = {
        ...gameSession,
        endTime: new Date(),
      };
      await gameSessionRepository.save(newGameSession);
      return newGameSession;
    }
    return gameSession;
  },
  updatescore: async (playerId: PlayerId, score: number): Promise<GameSessionModel> => {
    const gameSession = await gameSessionRepository.findByPlayerId(playerId);
    assert(gameSession, 'gameSession not found');
    const newGameSession: GameSessionModel = {
      ...gameSession,
      score: gameSession.score + score,
    };
    await gameSessionRepository.save(newGameSession);
    return newGameSession;
  },
};
