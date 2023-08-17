import type { EventModel, GameModel } from '$/commonTypesWithClient/models';

export type Methods = {
  get: { resBody: GameModel[] };
  post: {
    resBody: { games: GameModel[]; event: EventModel };
  };
};
//動かない場合はserver/api/$api.tsをいい感じに書き換える
