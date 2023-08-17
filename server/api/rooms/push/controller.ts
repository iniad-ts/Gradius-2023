import { roomUsecase } from '$/usecase/roomUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => ({ status: 200, body: await roomUsecase.gunshot(body) }),
}));
