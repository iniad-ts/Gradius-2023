import type { UserId } from '$/commonTypesWithClient/branded';
import type { PlayerModel } from '$/commonTypesWithClient/models';

export type Methods = {
  get: {
    reqBody: {
      userId: UserId;
    };
    resBody: PlayerModel | null;
  };
  post: {
    reqBody: {
      player: PlayerModel;
    };
  };
};
