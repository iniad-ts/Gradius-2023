import type { Player } from '$/Usecase/playerUsecase';

export type Methods = {
  post: {
    reqBody: Player;
    resBody: Player;
  };
};
