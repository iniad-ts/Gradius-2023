import type { DefineMethods } from 'aspida';
import type { PlayerModel } from '../../commonTypesWithClient/models';

export type Methods = DefineMethods<{
  get: {
    query: {
      isPlaying?: boolean;
    };
    resBody: PlayerModel[];
  };
  post: {
    reqBody: {
      name: string;
      teamInfo: number;
    };
    resBody: PlayerModel;
  };
}>;
