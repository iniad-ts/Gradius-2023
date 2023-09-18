import { DEFAULT_PLAYER_MOVE_SPEED, SPEED_BOOST_DURATION_MS } from '../commonConstantsWithClient';
import type { PlayerModel } from '../commonTypesWithClient/models';
import { playerRepository } from '../repository/playerRepository';

interface ItemHandlers {
  [key: string]: (player: PlayerModel) => Promise<void>;
}
export const itemHandler: ItemHandlers = {
  speed: async (player: PlayerModel) => {
    try {
      const updatePlayerInfo: PlayerModel = {
        ...player,
        speed: DEFAULT_PLAYER_MOVE_SPEED * 2,
        Items: (player.Items ?? []).slice(1),
      };
      await playerRepository.save(updatePlayerInfo);

      setTimeout(async () => {
        try {
          const currentPlayer = await playerRepository.find(player.id);
          if (currentPlayer === null) return null;
          const updatePlayerInfo: PlayerModel = {
            ...currentPlayer,
            speed: DEFAULT_PLAYER_MOVE_SPEED,
          };
          await playerRepository.save(updatePlayerInfo);
        } catch (error) {
          console.error('速度のリセットに失敗しました:', error);
        }
      }, SPEED_BOOST_DURATION_MS);
    } catch (error) {
      console.error('スピードアップに失敗しました:', error);
    }
  },
};
