import type { EntitiesResponse } from '$/commonTypesWithClient/models';
import { bulletUseCase } from './bulletUsecase';
import { enemyUseCase } from './enemyUsecase';
import { playerUseCase } from './playerUsecase';

export const entityUseCase = {
  getEntitiesByDisplayNumber: async (displayNumber: number): Promise<EntitiesResponse> => {
    const [bullets, enemies, players] = await Promise.all([
      bulletUseCase.getBulletsByDisplay(displayNumber),
      enemyUseCase.getEnemiesByDisplay(displayNumber),
      playerUseCase.getPlayersByDisplay(),
    ]);

    return {
      bullets,
      enemies,
      players,
    };
  },
};
