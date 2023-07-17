export const posUsecase = {
  x: 0,
  y: 0;

  playerMove: (key: string) => {
    if (key === 'ArrowUp') {
      posUsecase.y -= 10;
    } else if (key === 'ArrowDown') {
      posUsecase.y += 10;
    } else if (key === 'ArrowLeft') {
      posUsecase.x -= 10;
    } else if (key === 'ArrowRight') {
      posUsecase.x += 10;
    }
    return { x: posUsecase.x, y: posUsecase.y };
  },
  getPosition: () => {
    return { x: posUsecase.x, y: posUsecase.y };
  },
};
// shoot : (key : string) => {

// },
