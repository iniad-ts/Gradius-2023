export type Pos = {
  x: number;
  y: number;
};

export type MoveTo = {
  toX: -1 | 0 | 1;
  toY: -1 | 0 | 1;
};

const player: Pos = {
  x: 100,
  y: 350,
};

const playerSpeed = 10;

export const controlUseCase = {
  getPosition: player,
  move: (moveTo: MoveTo): Pos => {
    player.x = Math.max(Math.min(player.x + moveTo.toX * playerSpeed, 1000), 0);
    player.y = Math.max(Math.min(player.y + moveTo.toY * playerSpeed, 700), 0);
    return player;
  },
};
