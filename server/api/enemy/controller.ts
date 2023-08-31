import { enemyUseCase } from '$/usecase/enemyUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: await enemyUseCase.findAll() }),
  post: async () => ({ status: 200, body: await enemyUseCase.create() }),
}));
