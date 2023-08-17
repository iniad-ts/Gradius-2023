<<<<<<< HEAD
=======
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
      playerId: UserId;
    };
  };
  post: {
    resBody: void;
  };
};
>>>>>>> 03663785872daa6745ed7d079ca26d8a5e223177
