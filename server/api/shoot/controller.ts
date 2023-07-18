import { bulletUsecase } from '$/usecase/bulletUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  post: ({ body }) => ({
    status: 200,
    body: bulletUsecase.bulletPosSave(body.x, body.y),
  }),
}));
