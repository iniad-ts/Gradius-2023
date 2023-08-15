<<<<<<< HEAD
=======
import { enemyUseCase } from '$/useCase/enemyUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ query }) => ({
    status: 200,
    body: await enemyUseCase.findInDisplay(query.display),
  }),
  delete: async ({ body }) => ({
    status: 200,
    body: await enemyUseCase.kill(body.enemyId, body.playerId),
  }),
  post: async () => ({
    status: 200,
    body: await enemyUseCase.create(),
  }),
}));
>>>>>>> 03663785872daa6745ed7d079ca26d8a5e223177
