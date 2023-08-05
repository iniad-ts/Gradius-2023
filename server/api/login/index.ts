import type { PlayerModel } from '$/commonTypesWithClient/models';

export type Methods = {
  get: {
    resBody: string;
  };
  post: {
    reqBody: {
      name: string;
    };
    resBody: PlayerModel | null;
  };
};
