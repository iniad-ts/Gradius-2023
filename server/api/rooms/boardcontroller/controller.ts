import { roomUsecase } from '$/usecase/roomUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => {
    const result = await roomUsecase.pushbutton(body);
    return {
      status: 200,
      body: result,
    };
  },
}));
