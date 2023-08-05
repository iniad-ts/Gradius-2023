import { playerUsecase } from '$/Usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => {
    return {
      status: 200,
      body: await playerUsecase.pushbutton(body),
    };
  },
}));
