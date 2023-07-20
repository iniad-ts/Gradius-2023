import type { Enemy_Info } from '$/repository/Usecase/enemyUsecase';

export type Methods = {
  get: {
    resBody: Enemy_Info[];
  };
};
