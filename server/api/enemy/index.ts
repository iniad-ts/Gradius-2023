import type { EnemyModel } from '$../../commonTypesWithClient/models';
import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    resBody: EnemyModel[];
  };
  post: {
    reqBody: EnemyModel;
  };
}>;
