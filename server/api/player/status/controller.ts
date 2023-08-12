import { playerUseCase } from '$/useCase/playerUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ body }) => ({ status: 200, body: await playerUseCase.getStatus(body.userId) }),
  post: async ({ body }) => ({
    status: 200,
    body: await playerUseCase.update(body.player),
  }),
}));
