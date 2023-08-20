import { enemy_list } from '$/repository/Usecase/enemyUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => {
    const enemie_pos = enemy_list;
    return {
      status: 200,
      body: enemie_pos,
    };
  },
}));
