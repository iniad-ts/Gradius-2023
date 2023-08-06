import type { PlayerModel } from '$/commonTypesWithClient/models';
import { playersRepository } from '$/repository/playersRepository';
import { userIdParser } from '$/service/idParsers';
import { defineHooks } from './$relay';

export type AdditionalRequest = {
  player: PlayerModel;
};

export default defineHooks(() => ({
  preHandler: async (req, res) => {
    const player = await playersRepository.find(userIdParser.parse(req.cookies['session-player']));

    if (!player) {
      if (req.method === 'POST') {
        res.status(401).send();
      }
      return;
    }

    req.player = player;
  },
}));
