import { move } from '$/repository/Usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => {
    const result = await move.moveplayer(body);
    return {
      status: 200,
      body: result,
    };
  },
}));
