import { playersRepository } from '$/repository/playersRepsitory';
import { playerUseCase } from '$/usecase/playerUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: await playersRepository.findAll() }),
  post: async ({ user, body }) => ({ status: 200, body: await playerUseCase.move(user.id, body) }),
}));
