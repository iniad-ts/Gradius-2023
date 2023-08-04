import { enemyRepository } from '$/repository/enemyRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: await enemyRepository.getEnemies() }),
}));
