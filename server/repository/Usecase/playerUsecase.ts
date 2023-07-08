// export type PlayerPosition = {
//   x: number;
//   y: number;
// };

export type MoveDirection = 'up' | 'down' | 'left' | 'right';

// export type PosAndMoveDire = {
//   Playerposition: PlayerPosition;
//   MoveDirection: MoveDirection;
// };

export let player_now_position: number[] = [100, 300];
export const playerUsecase = {
  moveplayer: async (movedirection: MoveDirection) => {
    if (movedirection === 'up') {
      player_now_position = [player_now_position[0] + 0, player_now_position[1] - 1];
      return [0, -1];
    } else if (movedirection === 'down') {
      player_now_position = [player_now_position[0] + 0, player_now_position[1] + 1];
      return [0, 1];
    } else if (movedirection === 'left') {
      player_now_position = [player_now_position[0] - 1, player_now_position[1]];
      return [-1, 0];
    } else if (movedirection === 'right') {
      player_now_position = [player_now_position[0] + 1, player_now_position[1]];
      return [1, 0];
    }
    return [0, 0];
  },
};
