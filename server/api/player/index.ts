import type { UserId } from '$/commonTypesWithClient/branded';
import type { DefineMethods } from 'aspida';
import type { PlayerModel } from '../../commonTypesWithClient/models';

export type Methods = DefineMethods<{
  get: {
    query: {
      displayNumber: number;
    };
    resBody: PlayerModel[];
  };
  post: {
    reqBody: {
      name: string;
    };
    resBody: PlayerModel;
  };
  delete: {
    reqBody: {
      userId: UserId;
    };
  };
}>;
