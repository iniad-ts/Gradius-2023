import { playersRepository } from '$/repository/playersRepository';
import { playerUseCase } from '$/useCase/playerUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: (await playersRepository.findAll()) ?? [] }),
  post: async ({ body, player }) => ({
    status: 200,
    body: await playerUseCase.move(player.id, body.moveTo),
  }),
  patch: async ({ body }) => ({
    status: 200,
    body: await playerUseCase.update(body.player),
  }),
}));
