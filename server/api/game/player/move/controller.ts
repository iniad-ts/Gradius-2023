import { playerUsecase } from '$/Usecase/playerUsecaseforDB';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => ({
    status: 201,
    body: await playerUsecase.move(body.player, body.MoveInput),
  }),
}));
