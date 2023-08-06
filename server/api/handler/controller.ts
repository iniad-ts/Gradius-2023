import { handlerusecase } from '$/usecase/handlerusecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  post: async ({ body }) => ({
    status: 200,
    body: await handlerusecase.operateXY(body.key, body.position),
  }),
}));
