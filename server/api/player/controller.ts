import { playerUseCase } from '$/usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ query }) => ({
    status: 200,
    body: (await playerUseCase.getPlayersByDisplay(query.displayNumber)) ?? [],
  }),
  post: async ({ body }) => ({
    status: 201,
    body: await playerUseCase.create(body.name),
  }),
  delete: async ({ body }) => ({
    status: 204,
    body: await playerUseCase.delete(body.userId),
  }),
}));
