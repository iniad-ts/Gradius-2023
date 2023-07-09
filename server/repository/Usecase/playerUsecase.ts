export type MoveDirection = 'up' | 'down' | 'left' | 'right';

export let player_now_position: number[] = [100, 300];
export const playerUsecase = {
  moveplayer: async (movedirection: MoveDirection) => {
    if (movedirection === 'up') {
      player_now_position = [player_now_position[0] + 0, player_now_position[1] - 10];
      return [0, -20];
    } else if (movedirection === 'down') {
      player_now_position = [player_now_position[0] + 0, player_now_position[1] + 10];
      return [0, 20];
    } else if (movedirection === 'left') {
      player_now_position = [player_now_position[0] - 10, player_now_position[1]];
      return [-20, 0];
    } else if (movedirection === 'right') {
      player_now_position = [player_now_position[0] + 10, player_now_position[1]];
      return [20, 0];
    }
    return [0, 0];
  },
};
