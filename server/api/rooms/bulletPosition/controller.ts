import { bulletUsecase } from '$/Usecase/bulletUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: await bulletUsecase.getBullets() }),
  post: async ({ body }) => {
    return { status: 200, body: await bulletUsecase.createBullet(body) };
  },
}));
