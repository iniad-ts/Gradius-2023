import type { UserId } from '$/commonTypesWithClient/branded';
import type { PlayerModel } from '$/commonTypesWithClient/models';
import type { MoveDirection } from '$/usecase/playerUsecase';

export type Methods = {
  get: {
    query: {
      userid: string;
    };
    resBody: PlayerModel;
  };
  post: {
    reqBody: {
      moveTo: MoveDirection;
      userId: UserId;
    };
    resBody: PlayerModel | null;
  };
};
