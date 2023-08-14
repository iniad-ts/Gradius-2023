import { playerUsecase } from '$/Usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => ({
    status: 200,
    body: { userId: await playerUsecase.createNewPlayer(body.username) },
  }),
}));
