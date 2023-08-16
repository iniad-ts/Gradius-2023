import type { PlayerModel } from '$/commonTypesWithClient/models';
import { playersRepository } from '$/repository/playersRepository';
import { userIdParser } from '$/service/idParsers';
import { playerUseCase } from '$/useCase/playerUseCase';
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
  post: async ({ player, body }) => ({
    status: 201,
    body: await playerUseCase.useItem(player, body.type),
  }),
}));
