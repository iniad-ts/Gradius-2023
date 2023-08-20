import { playerRepository } from '$/repository/playerRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: (await playerRepository.findAll()) ?? [] }),
}));
