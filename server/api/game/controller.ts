import { gameUsecase } from '$/usecase/gameusecase';
import { defineController } from './$relay';
export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  post: async ({ body }) => ({
    status: 200,
    body: await gameUsecase.playerMove(body.x, body.y, body.key, body.board),
  }),
}));
