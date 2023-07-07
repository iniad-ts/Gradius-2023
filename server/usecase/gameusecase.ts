export const gameUsecase = {
  playerMove: (x: number, y: number, key: string) => {
    if (key === 'ArrowUp') {
      y -= 1;
    } else if (key === 'ArrowDown') {
      y += 1;
    } else if (key === 'ArrowLeft') {
      x -= 1;
    } else if (key === 'ArrowRight') {
      x += 1;
    }
    return { x, y };
  },
};