import { enemiesRepository } from '$/repository/enemiesRepository';
import { enemyUseCase } from '$/useCase/enemyUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: (await enemiesRepository.findAll()) ?? [] }),
  delete: async ({ body }) => ({
    status: 200,
    body: await enemyUseCase.kill(body.enemyId, body.userId),
  }),
  post: async () => ({
    status: 200,
    body: await enemyUseCase.create(),
  }),
}));
