import { enemyUsecase } from '$/Usecase/enemyUsecase';
import type { EnemyId } from '$/commonTypesWithClient/branded';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: await enemyUsecase.getAllEnemies() }),
  post: async (req: { body: EnemyId }) => {
    const id = req.body;
    return { status: 200, body: await enemyUsecase.deleteEnemy(id) };
  },
}));
