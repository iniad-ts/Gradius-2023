import { playerUsecase } from '$/Usecase/playerUsecaseforDB';
import { playerRepository } from '$/repository/playerRepository';
import { playerIdParser } from '$/service/idParsers';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ user }) => ({
    status: 200,
    body: await playerRepository.findById(playerIdParser.parse(user.id)),
  }),
  post: async ({ body }) => ({
    status: 201,
    body: await playerUsecase.create(playerIdParser.parse(body.userid), body.username),
  }),
}));
