import type { Bullet } from '$/Usecase/bulletUsecase';
import type { Player } from '$/Usecase/playerUsecase';

export type Methods = {
  post: {
    reqBody: Player;
    resBody: Bullet;
  };
};
