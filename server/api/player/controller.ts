import { playerUseCase } from '$/usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ query }) => ({
    status: 200,
    body: (await playerUseCase.getPlayersInDisplay(query.displayNumber)) ?? [],
  }),
  post: async ({ body }) => ({
    status: 200,
    body: await playerUseCase.create(body.name),
  }),
}));
