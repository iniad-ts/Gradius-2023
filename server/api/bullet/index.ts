import type { UserId } from '$/commonTypesWithClient/branded';
import type { BulletModel } from '$/commonTypesWithClient/models';
import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    resBody: BulletModel[];
  };
  post: {
    reqBody: {
      userId: UserId;
    };
    resBody: BulletModel;
  };
}>;
