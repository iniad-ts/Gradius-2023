import { move_player } from '$/repository/Usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => {
    const result = await move_player.moveplayer(body);
    return {
      status: 202,
      body: result,
    };
  },
}));
