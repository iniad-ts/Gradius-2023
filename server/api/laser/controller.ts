import { laser_position } from '$/repository/Usecase/laserUsecase';
import { defineController } from './$relay';
//gamescreenへ玉の位置を渡す
export default defineController(() => ({
  get: async () => {
    const laser_pos = laser_position;
    return {
      status: 204,
      body: laser_pos,
    };
  },
}));
