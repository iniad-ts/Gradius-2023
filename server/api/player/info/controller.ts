import { playerUseCase } from '$../../usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: await playerUseCase.getAllStatus() }),
}));
