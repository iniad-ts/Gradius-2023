import type { UserId } from '../../../commonTypesWithClient/branded';
import type { BulletModel } from '../../../commonTypesWithClient/models';

export type Methods = {
  get: {
    resBody: void;
  };
  post: {
    reqBody: {
      userId: UserId;
    };
    resBody: BulletModel;
  };
};
