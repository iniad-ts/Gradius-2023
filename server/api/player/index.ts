import type { PlayerModel } from '$/commonTypesWithClient/models';
import type { MoveTo } from '$/useCase/playerUseCase';

export type Methods = {
  get: {
    query: {
      display: number;
    };
    resBody: PlayerModel[];
  };
  post: {
    reqBody: {
      moveTo: MoveTo;
    };
    resBody: PlayerModel | null;
  };
  delete: {
    reqBody: {
      player: PlayerModel;
      bulletId: string;
      display: number;
    };
  };
};
