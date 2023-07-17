import { posUsecase } from '$/usecase/posUsecase';
import { defineController } from './$relay';
export default defineController(() => ({
  get: () => ({ status: 200, body: posUsecase.getPosition() }),

  post: ({ body }) => ({
    status: 200,
    body: posUsecase.playerMove(body.key),
  }),
}));
