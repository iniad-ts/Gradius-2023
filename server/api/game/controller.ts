import { gameUsecase } from "$/usecase/gameusecase";
import { defineController } from './$relay';
export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  post: ({ body }) => ({
    status: 200,
    body: gameUsecase.playerMove(body.x, body.y, body.key),
  }),
}));
