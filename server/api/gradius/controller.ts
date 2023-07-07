import { gradiusRepository } from '$/repository/gradiosRepository';
import { gradiusUaeCase } from '$/useCase/gradiusUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: gradiusRepository.findOfName('myPlane') }),
  post: async ({ body }) => ({ status: 201, body: await gradiusUaeCase.input(body) }),
}));
