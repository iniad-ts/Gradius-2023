import { playerRepository } from '$/repository/playerRepository';
import { playerUseCase } from '$/usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: (await playerRepository.findAll()) ?? [] }),
  post: async ({ body }) => ({ status: 200, body: await playerUseCase.create(body.name) }),
}));
