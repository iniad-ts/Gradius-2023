import type { BulletModel } from '$/commonTypesWithClient/models';

export type Methods = {
  get: {
    query: {
      display: number;
    };
    resBody: BulletModel[];
  };
  post: {
    resBody: BulletModel | null;
  };
};
