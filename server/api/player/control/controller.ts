import { playerRepository } from '$/repository/playerRepository';
import { playerUseCase } from '$/usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ query }) => ({
    status: 200,
    body: await playerRepository.find(query.userId),
  }),
  post: async ({ body }) => ({
    status: 200,
    body: await playerUseCase.move(body.MoveDirection, body.userId),
  }),
}));
