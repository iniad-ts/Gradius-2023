<<<<<<< HEAD
=======
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
};
>>>>>>> 03663785872daa6745ed7d079ca26d8a5e223177
