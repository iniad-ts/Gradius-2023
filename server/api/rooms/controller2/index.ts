import type { MoveDirection } from '$/usecase/roomUsecase';

export type Methods = {
  post: {
    reqBody: MoveDirection;
    resBody: string;
  };
};
