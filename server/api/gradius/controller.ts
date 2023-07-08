import { gradiusUaeCase } from '$/useCase/gradiusUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => ({ status: 201, body: await gradiusUaeCase.input(body) }),
}));
