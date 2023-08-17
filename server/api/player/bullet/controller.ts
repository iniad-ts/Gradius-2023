import { bulletUseCase } from '$/usecase/bulletUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: bulletUseCase.getBullets }),
  post: ({ body }) => ({ status: 200, body: bulletUseCase.addBullet(body) }),
}));
