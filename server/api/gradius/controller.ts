import { gradiusRepository } from '$/repository/gradiosRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ user }) => ({ status: 201, body: await gradiusRepository.findOfId(user.id) }),
}));
