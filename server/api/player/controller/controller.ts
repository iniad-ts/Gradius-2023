import { playerRepository } from '$/repository/playerRepository';
import { userIdParser } from '$/service/idParsers';
import { playerUsecase } from '$/usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ query }) => ({
    status: 200,
    body: playerRepository.find(userIdParser.parse(query.userid)),
  }),
  post: async ({ body }) => ({
    status: 200,
    body: await playerUsecase.move(body.MoveDirection, body.userId),
  }),
}));
