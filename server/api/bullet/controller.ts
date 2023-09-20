import { bulletUseCase } from '$/usecase/bulletUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ query }) => ({
    status: 200,
    body: (await bulletUseCase.getBulletsByDisplay(query.displayNumber)) ?? [],
  }),
  post: async ({ body }) => ({ status: 200, body: await bulletUseCase.shoot(body.userId) }),
}));
