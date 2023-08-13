import { gameUseCase } from '$/useCase/gameUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: (await gameUseCase.config.get()).displayNumber }),
  post: async ({ body }) => ({
    status: 200,
    body: await gameUseCase.config.setup(body.displayNumber),
  }),
}));
