import { playerUsecase } from '$/Usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: ({ body }) => ({ status: 200, body: playerUsecase.move(body) }),
}));
