<<<<<<< HEAD
import { position } from '$/usecase/playerUsecase';
=======
import { position } from '$/Usecase/playerUsecase';
>>>>>>> parent of 0c8ecf5 (Merge branch 'main' of github.com:INIAD-Developers/Gradius-2023-A)
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: position }),
}));
