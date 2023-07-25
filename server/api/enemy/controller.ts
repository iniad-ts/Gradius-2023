import { enemiesRepository } from '$/repository/enemiesRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: (await enemiesRepository.getAll()) ?? [] }),
}));
