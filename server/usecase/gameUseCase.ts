import type { GameModel } from '$/commonTypesWithClient/models';
import { gameRepository } from '$/repository/gameRepository';
import { enemyUseCase } from './enemyUseCase';

const spawnEnemyId = setInterval(enemyUseCase.spawn, 5000);
const moveEnemyId = setInterval(enemyUseCase.moveAll, 50);

export const gameUseCase = {
  findGameId: async () => {
    const game: GameModel | null = await gameRepository.get();
    if (game !== null) return game.id;
    return (await gameRepository.create()).id;
  },
};
