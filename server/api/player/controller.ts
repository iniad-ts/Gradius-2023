import { player_now_position } from '$/repository/Usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => {
    const player_ps = player_now_position;
    return {
      status: 205,
      body: player_ps,
    };
  },
}));
