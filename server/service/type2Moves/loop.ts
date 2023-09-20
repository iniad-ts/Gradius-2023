import type { MoveModel } from '$/commonTypesWithClient/models';

export const loop = (ENEMY_MOVE_SPEED: number): MoveModel => {
  const moves = [
    (time: number) => {
      const centerX = -875;
      const centerY = 270;
      const r = 250;
      const x = centerX + Math.cos(time * Math.PI) * r;
      const y = centerY + Math.sin(time * Math.PI) * r;
      return { x, y };
    },
  ];
  const MOVE_LOOP_DURATION_MS = 2000;

  const STEP_DURATION_MS = 2000;

  const TIME_TABLE = [0];

  const TIME_TABLE_LENGTH = 1;

  return { moves, MOVE_LOOP_DURATION_MS, TIME_TABLE, STEP_DURATION_MS };
};
