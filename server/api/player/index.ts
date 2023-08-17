import type { PlayerModel } from '$/commonTypesWithClient/models';
import type { MoveTo } from '$/useCase/playerUseCase';

export type Methods = {
  get: {
    resBody: PlayerModel[];
  };
  post: {
    reqBody: {
      name: string;
      moveTo: MoveTo;
    };
    resBody: PlayerModel | null;
  };
};
