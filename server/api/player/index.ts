import type { PlayerModel } from '$/commonTypesWithClient/models';
import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    resBody: PlayerModel[];
  };
  post: {
    reqBody: {
      name: string;
    };
    resBody: PlayerModel | null;
  };
}>;
