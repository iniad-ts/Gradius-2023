import { gameUseCase } from '$/usecase/gameUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: await gameUseCase.get() }),
  post: async ({ body }) => ({ status: 200, body: await gameUseCase.update(body.displayNumber) }),
}));
