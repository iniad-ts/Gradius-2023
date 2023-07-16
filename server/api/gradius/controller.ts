import { gradiusRepository } from '$/repository/gradiosRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: await gradiusRepository.getGameModels() }),
  post: async ({ user }) => ({ status: 201, body: await gradiusRepository.findOfId(user.id) }),
}));
