import { playerUseCase } from '$/usecase/playerUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: playerUseCase.getPosition }),
  post: ({ body }) => ({ status: 200, body: playerUseCase.move(body) }),
}));
