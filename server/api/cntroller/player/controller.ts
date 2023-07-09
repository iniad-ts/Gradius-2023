import { playerUsecase } from '$/repository/Usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => {
    const result = await playerUsecase.moveplayer(body);
    return {
      status: 200,
      body: result,
    };
  },
}));
