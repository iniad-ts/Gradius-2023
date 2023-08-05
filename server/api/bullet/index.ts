import type { UserId } from '$/commonTypesWithClient/branded';
import type { BulletModel } from '$/commonTypesWithClient/models';

export type Methods = {
  get: {
    query: {
      display: number;
    };
    resBody: BulletModel[];
  };
  post: {
    reqBody: {
      id: UserId;
    };
    resBody: BulletModel | null;
  };
};
