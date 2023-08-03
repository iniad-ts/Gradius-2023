import { roomUsecase } from '$/usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => {
    return {
      status: 200,
      body: await roomUsecase.pushbutton(body),
    };
  },
}));
