import { make_laser } from '$/repository/Usecase/laserUsecase';
import { defineController } from './$relay';
//何も値を送らない場合
//shot命令
export default defineController(() => ({
  post: async () => {
    await make_laser.shot_laser();
    return {
      status: 206,
    };
  },
}));
