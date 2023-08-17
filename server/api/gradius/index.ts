import type { GameModel } from '$/commonTypesWithClient/models';

export type Methods = {
  get: { resBody: GameModel };
  post: {
    reqBody: number;
  };
};
