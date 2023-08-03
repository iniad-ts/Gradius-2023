import type { UserId } from '$/commonTypesWithClient/branded';
import type { BulletModel } from '$/commonTypesWithClient/models';

export type Methods = {
  get: {
    resBody: BulletModel[];
  };
  post: {
    reqBody: {
      id: UserId;
    };
    resBody: BulletModel | null;
  };
};
