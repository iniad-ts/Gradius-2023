import { laser_pos_list } from '$/repository/Usecase/laserUsecase';
import { defineController } from './$relay';
//gamescreenへ玉の位置を渡す

export default defineController(() => ({
  get: async () => {
    const laser_pos = laser_pos_list;
    return {
      status: 200,
      body: laser_pos,
    };
  },
}));
