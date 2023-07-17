import type { RoomModel } from '$/commonTypesWithClient/models';
import { gamerepository } from '$/repository/gamerepositry';

const initBoard = () => [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export const gameUsecase = {
  // eslint-disable-next-line complexity
  create: async () => {
    const newRoom: RoomModel = {
      x: 4,
      y: 0,
      board: initBoard(),
    };
    await gamerepository.save(newRoom);
    console.log(newRoom);
    return newRoom;
  },
  playerMove: async (x: number, y: number, key: string, board: number[][]): Promise<RoomModel> => {
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
    const newGame: RoomModel = { x, y, board };
    await gamerepository.save(newGame);
    return newGame;
  },
};
