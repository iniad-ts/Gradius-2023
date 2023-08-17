import type { BulletModel } from '$/commonTypesWithClient/models';

export type Methods = {
  get: {
    query: {
      display: number;
    };
    resBody: { playerS: BulletModel[]; enemyS: BulletModel[] };
  };
  delete: {
    reqBody: {
      bulletId: string;
    };
  };
  post: {
    resBody: BulletModel | null;
  };
};
