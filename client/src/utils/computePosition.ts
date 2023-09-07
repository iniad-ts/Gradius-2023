type Pos = {
  x: number;
  y: number;
};

export const computePosition = (createdPos: Pos, createdAt: number, direction: Pos) => {
  const now = Date.now();
  const timeDiff = now - createdAt;
  const distance = (timeDiff / 1000) * 300;

  return {
    x: createdPos.x + direction.x * distance,
    y: createdPos.y + direction.y * distance,
  };
};
