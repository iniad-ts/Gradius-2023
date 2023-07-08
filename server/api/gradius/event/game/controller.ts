import { gradiusRepository } from '$/repository/gradiosRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => ({ status: 201, body: await gradiusRepository.findOfName(body) }),
}));
