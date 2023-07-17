import { gameSessionUsecase } from '$/Usecase/gameSessionUsecase';
import { playerIdParser } from '$/service/idParsers';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => ({
    status: 200,
    body: await gameSessionUsecase.updatescore(playerIdParser.parse(body.playerId), body.score),
  }),
}));
