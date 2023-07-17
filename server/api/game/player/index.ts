import type { PlayerModel } from '$/commonTypesWithClient/models';
import type { MoveInput } from './../../../Usecase/playerUsecaseforDB';
export type Methods = {
  post: {
    reqBody: {
      player: PlayerModel;
      MoveInput: MoveInput;
    };
    resBody: PlayerModel;
  };
  get: {
    resBody: PlayerModel | null;
  };
};
