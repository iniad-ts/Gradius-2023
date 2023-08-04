import { enemiesRepository } from '$/repository/enemiesRepository';
import { enemyUseCase } from '$/useCase/enemyUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: (await enemiesRepository.findAll()) ?? [] }),
  post: async ({ body }) => ({
    status: 200,
    body: await enemyUseCase.delete(body.enemyId, body.userId),
  }),
}));
