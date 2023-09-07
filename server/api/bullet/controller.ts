import { bulletUseCase } from '$/usecase/bulletUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ query }) => ({
    status: 200,
    body: (await bulletUseCase.getBulletByDisplayNumber(query.displayNumber)) ?? [],
  }),
  post: async ({ body }) => ({ status: 200, body: await bulletUseCase.create(body.userId) }),
}));
