import { enemyUsecase } from '$/usecase/enemyUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async () => ({ status: 200, body: await enemyUsecase.create_enemy() }),
}));
