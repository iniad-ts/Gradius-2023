import { gameUsecase } from '$/usecase/gameusecase';
import { defineController } from './$relay';
export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  post: async ({ body, user }) => ({
    status: 200,
    body: await gameUsecase.playerMove(body.key, body.position, user.id),
  }),
}));
