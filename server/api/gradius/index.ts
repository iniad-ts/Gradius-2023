import type { EventModel, GameModel } from '$/commonTypesWithClient/models';

export type Methods = {
  get: { resBody: GameModel[] };
  post: {
    resBody: { games: GameModel[]; event: EventModel };
  };
};
