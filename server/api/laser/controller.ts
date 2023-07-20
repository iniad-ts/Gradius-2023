import { laseies_info } from '$/repository/Usecase/laserUsecase';
import { defineController } from './$relay';
export default defineController(() => ({
  get: async () => {
    const laser_info = laseies_info;
    return {
      status: 200,
      body: laser_info,
    };
  },
}));
