import { enemyInfo } from '$/Usecase/enemyUsecase';
import { playerInfo } from '$/Usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({
    status: 200,
    body: {
      playerSpeed: playerInfo.playerSpeed,
      playerSize: playerInfo.playerSize,
      makeEnemyFrequency: enemyInfo.makeEnemyFrequency,
      enemySpeed: enemyInfo.enemySpeed,
      enemySize: enemyInfo.enemySize,
      // creenNumber:
    },
  }),
}));
