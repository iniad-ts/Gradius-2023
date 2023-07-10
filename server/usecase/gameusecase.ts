export const gameUsecase = {
  // eslint-disable-next-line complexity
  playerMove: (x: number, y: number, key: string, board: number[][]) => {
    console.log(board);
    board[x][y] = 0;
    console.log(board);
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

    return { x, y, board };
  },
};
