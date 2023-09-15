import type { PlayerModel } from '../commonTypesWithClient/models';

export const diffToBaseTimeSec = (player: PlayerModel) => {
  const nowTIme = Date.now();
  return (nowTIme - player.startedAt) / 1000;
};
