import type { EventModel, GameModel } from '$/commonTypesWithClient/models';

export type Methods = {
  post: {
    reqBody: string;
    resBody: { game: GameModel; event: EventModel };
  };
};
//動かない場合はserver/api/$api.tsをいい感じに書き換える
