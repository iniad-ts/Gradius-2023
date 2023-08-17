import { bulletsRepository } from '$/repository/bulletsRepository';
import { bulletUseCase } from '$/useCase/bulletUseCase';
import { enemyUseCase } from '$/useCase/enemyUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => {
    bulletUseCase.delete();
    enemyUseCase.respawn();
    return { status: 200, body: (await bulletsRepository.findAll()) ?? [] };
  },
  delete: async ({ body }) => ({
    status: 200,
    body: await bulletsRepository.delete(body.bulletId),
  }),
  post: async ({ player }) => ({ status: 200, body: await bulletUseCase.create(player.id) }),
}));
