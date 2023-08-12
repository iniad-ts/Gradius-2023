import type { EnemyId } from '$/commonTypesWithClient/branded';
import type { EnemyModel } from '$/commonTypesWithClient/models';

export type Methods = {
  get: {
    resBody: EnemyModel[];
  };
  post: {
    reqBody: EnemyId;
  };
};
