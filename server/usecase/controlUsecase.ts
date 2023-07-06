const direction = [
  [1, 0],
  [0, -1],
  [-1, 0],
  [0, -1],
];
export const controlUsecase = {
  key: (x: number, y: number, a: number) => {
    const afterX = x + direction[a][0];
    const afterY = y + direction[a][1];
    return { x: afterX, y: afterY };
  },
};
