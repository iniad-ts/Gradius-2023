export const gameUsecase = {
  // eslint-disable-next-line complexity
  playerMove: (x: number, y: number, key: string, board: number[][]) => {
    board[x][y] = 0;
    if (key === 'ArrowUp') {
      x -= 1;
    } else if (key === 'ArrowDown') {
      x += 1;
    } else if (key === 'ArrowLeft') {
      y -= 1;
    } else if (key === 'ArrowRight') {
      y += 1;
    }
    board[x][y] = 1;
    console.log(x, y, board);
    return { x, y, board };
  },
};
