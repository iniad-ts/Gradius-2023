import type { PlayerModel } from '$/commonTypesWithClient/models';
import { playersRepository } from '$/repository/playersRepository';
import { userIdParser } from '$/service/idParsers';
import { gameUseCase } from '$/useCase/gameUseCase';
import { defineController, defineHooks } from './$relay';

export type AdditionalRequest = {
  player: PlayerModel;
};

export const hooks = defineHooks(() => ({
  preHandler: async (req, res) => {
    const player = await playersRepository.find(userIdParser.parse(req.cookies['session-player']));

    if (player === null) {
      if (req.method === 'GET') {
        res.status(401).send();
      }
      return;
    }
    req.player = player;
  },
}));

export default defineController(() => ({
  put: async ({ player }) => ({ status: 200, body: await gameUseCase.update(player.id) }),
  post: ({ body, query }) => ({
    status: 201,
    body: gameUseCase.collision(body.player, body.enemy, query.display),
  }),
}));
