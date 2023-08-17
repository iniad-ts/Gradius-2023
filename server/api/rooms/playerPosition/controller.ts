import { position } from '$/Usecase/playerUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: position }),
}));
