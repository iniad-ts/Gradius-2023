import { bulletRepository } from '$/repository/bulletRepository';
import { bulletUseCase } from '$/usecase/bulletUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: (await bulletRepository.findAll()) ?? [] }),
  post: async ({ body }) => ({ status: 200, body: await bulletUseCase.create(body.userId) }),
}));
