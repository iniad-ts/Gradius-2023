import type { EventModel, GameModel } from '$/commonTypesWithClient/models';

export type Methods = {
  post: {
    reqBody: string;
    resBody: { game: GameModel; event: EventModel };
  };
};
