import type { BulletModelWithPosition } from '$/usecase/bulletUseCase';

export type Methods = {
  get: {
    resBody: BulletModelWithPosition[];
  };
  post: {
    resBody: BulletModelWithPosition | null;
  };
};
