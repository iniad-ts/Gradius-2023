import { gameSessionUsecase } from '$/Usecase/gameSessionUsecase';
import { gameSessionRepository } from '$/repository/gameSessionRepository';
import { playerIdParser, stageIdParser } from '$/service/idParsers';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ user }) => ({
    status: 200,
    body: await gameSessionRepository.findLatestByPlayerId(user.id),
  }),
  post: async ({ body }) => {
    return {
      status: 200,
      body: await gameSessionUsecase.create(
        playerIdParser.parse(body.playerId),
        stageIdParser.parse(body.stageId)
      ),
    };
  },
}));
