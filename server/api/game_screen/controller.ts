import { player_info } from '$/repository/Usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => {
    const player_ps = [player_info.pos.x, player_info.pos.y];
    return {
      status: 200,
      body: player_ps,
    };
  },
}));
