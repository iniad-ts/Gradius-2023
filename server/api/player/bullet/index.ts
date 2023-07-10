import type { Bullet } from '$/usecase/bulletUseCase';

export type Methods = {
  get: {
    resBody: Bullet[];
  };
  post: {
    reqBody: { radius: number };
    resBody: Bullet;
  };
};
