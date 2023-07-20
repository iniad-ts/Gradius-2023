import { enemyUsecase } from '$/Usecase/enemyUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: ({ body }) => ({ status: 200, body: enemyUsecase.horizontalMove(body) }),
}));
