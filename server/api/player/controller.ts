import { playersRepository } from '$/repository/playersRepository';
import { playerUseCase } from '$/useCase/playerUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: (await playersRepository.findAll()) ?? [] }),
  post: async ({ body }) => ({
    status: 200,
    body: await playerUseCase.move(body.name, body.moveTo),
  }),
}));
