import { gunPosition, gunShot } from '$/usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: gunPosition }),
  post: async () => {
    await gunShot();
    return { status: 200, body: gunPosition };
  },
}));
