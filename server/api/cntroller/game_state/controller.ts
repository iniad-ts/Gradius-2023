import { change_state } from '$/repository/Usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => {
    const new_game_state = await change_state.change_game_state(body);
    return {
      status: 200,
      body: new_game_state,
    };
  },
}));
