import type { MoveDirection } from '$/Usecase/playerUsecase';
import type { UserId } from '$/commonTypesWithClient/branded';
import type { PlayerModel } from '$/commonTypesWithClient/models';

export type Methods = {
  get: {
    resBody: PlayerModel[];
  };
  post: {
    reqBody: { moveDirection: MoveDirection; userId: UserId };
  };
};
