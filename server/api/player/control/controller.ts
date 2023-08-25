import { playerUsecase } from '$/usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ query }) => ({
    status: 200,
    body: await playerUsecase.getStatus(query.userId),
  }),
  post: async ({ body }) => ({
    status: 200,
    body: await playerUsecase.move(body.MoveDirection, body.userId),
  }),
}));
