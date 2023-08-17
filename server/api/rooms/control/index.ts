import type { MoveDirection } from '$/Usecase/playerUsecase';
export type Methods = {
  post: {
    reqBody: MoveDirection;
    resBody: string;
  };
};
