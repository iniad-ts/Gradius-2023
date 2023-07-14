import { roomUsecase } from '$/usecase/roomUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => {
    return {
      status: 200,
      body: await roomUsecase.pushbutton(body),
    };
  },
}));
