import type { PlayerModel } from '../commonTypesWithClient/models';

export const diffToBaseTimeSec = (player: PlayerModel) => {
  const nowTime = Date.now();
  return (nowTime - player.startedAt) / 1000;
};
