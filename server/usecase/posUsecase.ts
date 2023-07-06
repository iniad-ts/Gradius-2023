export const posUsecase = {
  playerMove: (pos: number, key: string) => {
    if (key === 'ArrowUp') {
      pos.y -= 1;
    } else if (key === 'ArrowDown') {
      pos.y += 1;
    } else if (key === 'ArrowLeft') {
      pos.x -= 1;
    } else if (key === 'ArrowRight') {
      pos.x += 1;
    }
    return pos;
  },
};
