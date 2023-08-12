import { enemyInfo } from '$/Usecase/enemyUsecase';
import { playerInfo } from '$/Usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({
    status: 200,
    body: {
      playerSpeed: playerInfo.playerSpeed,
      playersize: playerInfo.playerSize,
      makeEnemyFrequency: enemyInfo.makeEnemyFrequency,
      enemySpeed: enemyInfo.enemy_speed,
      enemySize: enemyInfo.enemySize,
      // creenNumber:
    },
  }),
}));
