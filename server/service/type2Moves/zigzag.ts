export const zigzagMove = (ENEMY_MOVE_SPEED: number) => {
  const moves = [
    (time: number) => {
      return { x: -ENEMY_MOVE_SPEED * time, y: ENEMY_MOVE_SPEED * time };
    }, //1s
    (time: number) => {
      const currentX = -500;
      const currentY = 500;
      return { x: currentX + -ENEMY_MOVE_SPEED * (time - 1), y: currentY };
    }, //2s
    (time: number) => {
      const currentX = -1500;
      const currentY = 500;
      return {
        x: currentX + ENEMY_MOVE_SPEED * (time - 3),
        y: currentY - ENEMY_MOVE_SPEED * (time - 3),
      };
    }, //0.5s
    (time: number) => {
      const currentX = -1250;
      const currentY = 250;
      return { x: currentX - ENEMY_MOVE_SPEED * (time - 3.5), y: currentY };
    }, //1s
    (time: number) => {
      const currentX = -1750;
      const currentY = 250;
      return {
        x: currentX + ENEMY_MOVE_SPEED * (time - 4.5),
        y: currentY - ENEMY_MOVE_SPEED * (time - 4.5),
      };
    }, //0.5s
    (time: number) => {
      const currentX = -1500;
      const currentY = 0;
      return { x: currentX + ENEMY_MOVE_SPEED * (time - 5), y: currentY };
    }, //3s
  ];

  const MOVE_LOOP_DURATION_MS = 8000;

  const STEP_DURATION_MS = 500;

  const TIME_TABLE = [0, 0, 1, 1, 1, 1, 2, 3, 3, 4, 5, 5, 5, 5, 5, 5];

  const TIME_TABLE_LENGTH = 16;

  return { moves, MOVE_LOOP_DURATION_MS, TIME_TABLE, STEP_DURATION_MS };
};
