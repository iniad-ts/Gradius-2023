// export type PlayerPosition = {
//   x: number;
//   y: number;
// };

export type MoveDirection = 'up' | 'down' | 'left' | 'right';

// export type PosAndMoveDire = {
//   Playerposition: PlayerPosition;
//   MoveDirection: MoveDirection;
// };

export const playerUsecase = {
  moveplayer: async (movedirection: MoveDirection) => {
    if (movedirection === 'up') {
      return [0, -1];
    } else if (movedirection === 'down') {
      return [0, 1];
    } else if (movedirection === 'left') {
      return [-1, 0];
    } else if (movedirection === 'right') {
      return [1, 0];
    }
    return [0, 0];
  },
};
