import type { GameState } from '$/repository/Usecase/playerUsecase';

export type Methods = {
  post: {
    resBody: GameState;
    reqBody: number;
  };
};
