import type { EnemyModel, PlayerModel } from '$/commonTypesWithClient/models';

export type Methods = {
  put: {
    resBody: PlayerModel | null;
  };
  post: {
    reqBody: { player: PlayerModel; enemy: EnemyModel };
  };
};
