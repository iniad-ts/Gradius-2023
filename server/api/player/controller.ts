import { playerUseCase } from '$/usecase/playerUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ user }) => ({
    status: 200,
    body: await playerUseCase.get(user.id, user.displayName ?? 'Player'),
  }),
  post: async ({ user, body }) => ({ status: 200, body: await playerUseCase.move(user.id, body) }),
}));
