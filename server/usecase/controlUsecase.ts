const direction = [
  [0, -1],
  [-1, 0],
  [1, 0],
  [0, 1],
];
export const controlUsecase = {
  key: (x: number, y: number, a: number) => {
    let afterX = x + direction[a][0];
    if (afterX === -1 || afterX === 9) {
      afterX = x;
    }

    let afterY = y + direction[a][1];
    if (afterY === -1 || afterY === 16) {
      afterY = y;
    }
    return { x: afterX, y: afterY };
  },
};
