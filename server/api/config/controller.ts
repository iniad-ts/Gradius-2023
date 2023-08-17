import { enemyUsecase } from '$/Usecase/enemyUsecase';
import { playerUsecase } from '$/Usecase/playerUsecase';

import { defineController } from './$relay';

const enemyInfo = enemyUsecase.getEnemyInfo();
const playerInfo = playerUsecase.getPlayerInfo();

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
  post: async ({ body }) => ({
    status: 201,
    body: enemyUsecase.updateInfo(body),
  }),
}));
