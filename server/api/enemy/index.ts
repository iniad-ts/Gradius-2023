import type { UserId } from '$/commonTypesWithClient/branded';
import type { EnemyModel } from '$/commonTypesWithClient/models';

export type Methods = {
  get: {
    query: {
      display: number;
    };
    resBody: EnemyModel[];
  };
  delete: {
    reqBody: {
      enemyId: string;
      userId: UserId;
    };
  };
  post: {
    resBody: void;
  };
};
