import { enemies_info } from '$/repository/Usecase/enemyUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => {
    const enemieies_info = enemies_info;
    return {
      status: 200,
      body: enemieies_info,
    };
  },
}));
