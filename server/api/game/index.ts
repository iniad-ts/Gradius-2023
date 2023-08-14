import type { EnemyModel, PlayerModel } from '$/commonTypesWithClient/models';

export type Methods = {
  put: {
    resBody: PlayerModel | null;
  };
  post: { query: { display: number }; reqBody: { player: PlayerModel; enemy: EnemyModel } };
};
