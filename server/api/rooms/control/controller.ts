import { playerUsecase } from '$/Usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => {
    return {
      status: 200,
      body: await playerUsecase.getPlayerPos(),
    };
  },

  post: async ({ body }) => {
    return {
      status: 200,
      body: await playerUsecase.movePlayer(body),
    };
  },
}));
