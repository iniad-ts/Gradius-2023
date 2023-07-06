import { controlUsecase } from '$/usecase/controlUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  post: async ({ body }) => ({ status: 201, body: controlUsecase.key(body.x) }),
}));
