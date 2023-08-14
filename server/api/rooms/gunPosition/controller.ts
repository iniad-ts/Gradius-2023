import { bulletUsecase } from '$/Usecase/bulletUsecase';
import { bulletPosition, gunShot } from '$/Usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: await bulletUsecase.getBullets() }),
  post: async ({ body }) => {
    await gunShot(body);
    return { status: 200, body: bulletPosition };
  },
}));
