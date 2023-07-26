import type { GameModel, UserEventModel } from '$/commonTypesWithClient/models';

export type Methods = {
  get: { resBody: GameModel[] };
  post: {
    resBody: { games: GameModel[]; event: UserEventModel };
  };
};
