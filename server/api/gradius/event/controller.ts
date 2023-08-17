import { gradiusRepository } from '$/repository/gradiosRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => ({
    status: 200,
    body: await gradiusRepository.crate(body.name, body.level),
  }),
}));
