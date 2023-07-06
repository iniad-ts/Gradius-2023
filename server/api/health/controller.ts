import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: 'ok' }),
  post: async ({ body }) => ({ status: 201, body: await roomUsecase.create(body.name) }),
}));
