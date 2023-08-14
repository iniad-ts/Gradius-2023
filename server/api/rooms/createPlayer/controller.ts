import { playerUsecase } from '$/Usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: { userId: await playerUsecase.createNewPlayer() } }),
}));
