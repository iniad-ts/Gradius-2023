/*  DB反映後のプレイヤーの移動処理
クライアント側への説明後に差し替える*/

import type { PlayerModel } from '$/commonTypesWithClient/models';
import { playerRepository } from '$/repository/playerRepository';

export type MoveInput = 'up' | 'down' | 'left' | 'right';

export const playerUsecase = {
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
