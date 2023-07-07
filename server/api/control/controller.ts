import { controlUsecase } from '$/usecase/controlUsecase';
import { enemyUsecase } from '$/usecase/enemyUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: 'ok' }),
  post: ({ body }) => ({ status: 201, body: controlUsecase.key(body.x, body.y, body.KeyEvent) }),
}));
