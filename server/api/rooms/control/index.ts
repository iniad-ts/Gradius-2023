import type { MoveDirection } from '$/usecase/playerUsecase';
export type Methods = {
  post: {
    reqBody: MoveDirection;
    resBody: string;
  };
};
