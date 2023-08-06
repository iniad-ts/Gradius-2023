import { bulletsRepository } from '$/repository/bulletsRepository';
import { bulletUseCase } from '$/useCase/bulletUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => {
    bulletUseCase.delete();
    return { status: 200, body: (await bulletsRepository.findAll()) ?? [] };
  },
  post: async ({ player }) => ({ status: 200, body: await bulletUseCase.create(player.id) }),
}));
