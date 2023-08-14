import { bulletPosition, gunShot } from '$/Usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: bulletPosition }),
  post: async ({ body }) => {
    await gunShot(body);
    return { status: 200, body: bulletPosition };
  },
}));
