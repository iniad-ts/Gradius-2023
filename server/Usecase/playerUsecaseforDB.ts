/*  DB反映後のプレイヤーの移動処理
クライアント側担当への説明後に差し替える*/

import type { PlayerId } from '$/commonTypesWithClient/branded';
import type { PlayerModel } from '$/commonTypesWithClient/models';
import { playerRepository } from '$/repository/playerRepository';

export type MoveInput = 'up' | 'down' | 'left' | 'right';

export const playerUsecase = {
  create: async (userID: PlayerId, name: string) => {
    const player: PlayerModel = {
      id: userID,
      name,
      x: 0,
      //TODO ここでのy座標の初期値は仮置き
      y: 200,
    };
    await playerRepository.save(player);
    return player;
  },

  move: async (player: PlayerModel, moveInput: MoveInput) => {
    switch (moveInput) {
      case 'up':
        player.y -= 10;
        await playerRepository.save(player);
        break;
      case 'down':
        player.y += 10;
        await playerRepository.save(player);
        break;
      case 'left':
        player.x -= 10;
        await playerRepository.save(player);
        break;
      case 'right':
        player.x += 10;
        await playerRepository.save(player);
        break;
      default:
        break;
    }
    return player;
  },
};
