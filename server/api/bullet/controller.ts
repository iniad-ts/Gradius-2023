import { bulletsRepository } from '$/repository/bulletsRepository';
import { bulletUseCase } from '$/useCase/bulletsUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: (await bulletsRepository.findAll()) ?? [] }),
  post: async ({ body }) => ({ status: 200, body: await bulletUseCase.create(body.id) }),
}));
