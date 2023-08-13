import { gameUseCase } from '$/useCase/gameUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  put: async ({ player }) => ({ status: 200, body: await gameUseCase.update(player.id) }),
  post: ({ body }) => ({ status: 201, body: gameUseCase.collision(body.player, body.enemy) }),
}));
