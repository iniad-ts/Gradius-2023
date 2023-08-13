import { playerUseCase } from '$/useCase/playerUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ player }) => ({ status: 200, body: await playerUseCase.getStatus(player.id) }),
  post: async ({ body }) => ({
    status: 200,
    body: await playerUseCase.update(body.player),
  }),
}));
