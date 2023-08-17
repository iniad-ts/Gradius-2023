import type { MoveTo, Pos } from '$/usecase/controlUseCase';

export type Methods = {
  get: {
    resBody: Pos;
  };
  post: {
    reqBody: MoveTo;
    resBody: Pos;
  };
};
