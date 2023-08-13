import type { MoveDirection } from '$/Usecase/playerUsecase';
import type { playerModel } from '$/commonTypesWithClient/models';

export type Methods = {
  get: {
    resBody: playerModel[];
  };
  post: {
    reqBody: { moveDirection: MoveDirection; userId: string };
  };
};
