import { playersRepository } from '$/repository/playersRepository';
import { playerUseCase } from '$/usecase/playerUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: await playersRepository.getAll() }),
  post: async ({ user, body }) => ({ status: 200, body: await playerUseCase.move(user.id, body) }),
}));
