import type { MoveTo, Pos } from '$/usecase/playerUseCase';

export type Methods = {
  get: {
    resBody: Pos;
  };
  post: {
    reqBody: MoveTo;
    resBody: Pos;
  };
};
