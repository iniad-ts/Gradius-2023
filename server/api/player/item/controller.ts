import { playerUseCase } from '$/usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => ({
    status: 200,
    body: await playerUseCase.useitem(body.userId, body.itemId),
  }),
}));
