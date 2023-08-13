import { enemyUseCase } from '$/useCase/enemyUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ query }) => ({ status: 200, body: await enemyUseCase.findAll(query.display) }),
  delete: async ({ body }) => ({
    status: 200,
    body: await enemyUseCase.kill(body.enemyId, body.userId),
  }),
  post: async () => ({
    status: 200,
    body: await enemyUseCase.create(),
  }),
  start: async () => ({
    status: 200,
    body: await enemyUseCase.createAll(),
  }),
}));
