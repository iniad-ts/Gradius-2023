import { enemyUsecase } from '$/usecase/enemyUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: await enemyUsecase.findAll() }),
  post: async () => ({ status: 200, body: await enemyUsecase.create() }),
}));
