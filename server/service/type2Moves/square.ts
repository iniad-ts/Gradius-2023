import type { MoveModel } from '$/commonTypesWithClient/models';

export const squareMove = (ENEMY_MOVE_SPEED: number): MoveModel => {
  const moves = [
    (time: number) => {
      return { x: 0, y: ENEMY_MOVE_SPEED * time };
    }, //1s
    (time: number) => {
      const currentX = 0;
      const currentY = 500;
      return { x: currentX + -ENEMY_MOVE_SPEED * (time - 1), y: currentY };
    }, //3s
    (time: number) => {
      const currentX = -1500;
      const currentY = 500;
      return {
        x: currentX,
        y: currentY - ENEMY_MOVE_SPEED * (time - 4),
      };
    }, //1s
    (time: number) => {
      const currentX = -1500;
      const currentY = 0;
      return { x: currentX + ENEMY_MOVE_SPEED * (time - 5), y: currentY };
    }, //3s
  ];

  const MOVE_LOOP_DURATION_MS = 8000;

  const STEP_DURATION_MS = 500;

  const TIME_TABLE = [
    [0, 0],
    [1, 1, 1, 1, 1, 1],
    [2, 2],
    [3, 3, 3, 3, 3, 3],
    [4, 4],
  ].flat();

  const TIME_TABLE_LENGTH = 16;

  return { moves, MOVE_LOOP_DURATION_MS, TIME_TABLE, STEP_DURATION_MS };
};
