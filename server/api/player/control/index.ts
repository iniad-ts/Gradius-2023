import { playerRepository } from '$/repository/playerRepository';
import { playerUsecase } from '$/usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: (await playerRepository.findAll()) ?? [] }),
  post: async ({ body }) => ({
    status: 200,
    body: await playerUsecase.movePlayer(body.userid, body.moveTo),
  }),
}));
