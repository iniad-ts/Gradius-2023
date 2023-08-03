import type { UserId } from '$/commonTypesWithClient/branded';
import type { EnemyModel } from '$/commonTypesWithClient/models';

export type Methods = {
  get: {
    resBody: EnemyModel[];
  };
  post: {
    reqBody: {
      enemyId: string;
      userId: UserId;
    };
  };
};
