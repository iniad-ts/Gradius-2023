import type { PlayerModel } from '$/commonTypesWithClient/models';

export type Methods = {
  post: {
    reqBody: { player: PlayerModel; item: number };
  };
};
