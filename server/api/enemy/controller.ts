import { enemyUsecase } from '$/usecase/enemyUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  post: ({ body }) => ({ status: 200, body: enemyUsecase.move(body.y) }),
}));
