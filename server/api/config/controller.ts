import { configUsecase } from '$/Usecase/configUsecase';

import { defineController } from './$relay';

const enemyInfo = configUsecase.getEnemyInfo();
const playerInfo = configUsecase.getPlayerInfo();

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
    body: configUsecase.updateInfo(body),
  }),
}));
