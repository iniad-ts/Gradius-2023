import type { MoveInput } from '$/Usecase/playerUsecaseforDB';
import type { PlayerModel } from '$/commonTypesWithClient/models';

export type Methods = {
  post: {
    reqBody: {
      player: PlayerModel;
      MoveInput: MoveInput;
    };
    resBody: PlayerModel;
  };
};
