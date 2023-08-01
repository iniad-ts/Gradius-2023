import type { PlayerModel } from '$/commonTypesWithClient/models';
import type { MoveTo } from '$/usecase/playerUseCase';

export type Methods = {
  get: {
    resBody: PlayerModel[] | null;
  };
  post: {
    reqBody: MoveTo;
    resBody: PlayerModel | null;
  };
};
