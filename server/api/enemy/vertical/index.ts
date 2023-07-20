import type { Enemy } from '$/Usecase/enemyUsecase';

export type Methods = {
  post: {
    reqBody: Enemy;
    resBody: Enemy;
  };
};
