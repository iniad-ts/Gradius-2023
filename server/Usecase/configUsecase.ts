import type { ConfigModel } from '$/commonTypesWithClient/models';
import { enemyInfo } from './enemyUsecase';
import { playerInfo } from './playerUsecase';

export const configUsecase = {
  updateInfo: (newInfo: ConfigModel) => {
    enemyInfo.makeEnemyFrequency = newInfo.makeEnemyFrequency;
    enemyInfo.enemySpeed = newInfo.enemySpeed;
    enemyInfo.enemySize = newInfo.enemySize;
  },

  getEnemyInfo: () => {
    return enemyInfo;
  },

  getPlayerInfo: () => {
    return playerInfo;
  },
};
