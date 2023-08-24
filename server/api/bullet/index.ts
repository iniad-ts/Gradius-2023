import type { DefineMethods } from 'aspida';
import type { UserId } from '../../commonTypesWithClient/branded';
import type { BulletModel } from '../../commonTypesWithClient/models';

export type Methods = DefineMethods<{
  get: {
    resBody: BulletModel[];
  };
  post: {
    reqBody: {
      userId: UserId;
    };
    resBody: BulletModel | null;
  };
}>;
