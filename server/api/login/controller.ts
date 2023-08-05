import { playerUseCase } from '$/useCase/playerUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello, world' }),
  post: async ({ body }) => ({
    status: 200,
    body: await playerUseCase.create(body.name),
  }),
}));
