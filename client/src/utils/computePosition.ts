import type { Pos } from 'src/types/types';

export const computePosition = (
  createdPos: Pos,
  createdAt: number,
  direction: Pos,
  timeDiffFix: number
) => {
  const now = Date.now();
  const timeDiff = now - createdAt + timeDiffFix;
  const distance = (timeDiff / 1000) * 300;
  return {
    x: createdPos.x + direction.x * distance,
    y: createdPos.y + direction.y * distance,
  };
};
