import { playerUseCase } from '$/useCase/playerUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ query }) => ({ status: 200, body: await playerUseCase.findAll(query.display) }),
  post: async ({ body, player }) => ({
    status: 200,
    body: await playerUseCase.move(player.id, body.moveTo),
  }),
}));
