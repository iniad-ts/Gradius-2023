import { playerUseCase } from '$/usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ query }) => ({
    status: 200,
    body: await playerUseCase.getStatus(query.userId),
  }),
  post: async ({ body }) => ({
    status: 200,
    body: await playerUseCase.move(body.MoveDirection, body.userId),
  }),
}));
