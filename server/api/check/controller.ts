import { enemyUsecase } from '$/Usecase/enemyUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: await enemyUsecase.getAll_Enemies() }),
  get: async () => ({ status: 200, body: await enemyUsecase.getAll_Enemies() }),
  post: async (req: { body: EnemyId }) => {
    const id = req.body;
    return { status: 200, body: await enemyUsecase.delete_enemy(id) };
  },
}));
