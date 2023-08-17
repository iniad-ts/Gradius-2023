import { gamesRepository } from '$/repository/gamesRepository';
import { gameIdParser } from '$/service/idParsers';
import { randomUUID } from 'crypto';

export const gameUseCase = {
  get: async () => {
    const game = await gamesRepository.find();
    if (game !== null) {
      return game;
    }
    return await gamesRepository.save({
      id: gameIdParser.parse(randomUUID()),
      displayNumber: 0,
      createdAt: Date.now(),
    });
  },
  update: async (displayNumber: number) => {
    const game = await gamesRepository.find();
    if (game === null) {
      return;
    }
    await gamesRepository.save({
      ...game,
      displayNumber,
    });
    //await enemyUseCase.createAll();
  },
};
