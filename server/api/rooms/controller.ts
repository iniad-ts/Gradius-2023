import { roomsRepository } from '$/repository/roomRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: await roomsRepository.findLatest() }),
}));
