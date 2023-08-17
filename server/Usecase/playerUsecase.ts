type MoveInput = 'up' | 'down' | 'left' | 'right' | 'none';

export type PlayerPos = {
  x: number;
  y: number;
};

export type Player = {
  PlayerPos: PlayerPos;
  MoveInput: MoveInput;
};

export const playerUsecase = {
  move: (Player: Player) => {
    switch (Player.MoveInput) {
      case 'up':
        Player.PlayerPos.y -= 1;
        break;
      case 'down':
        Player.PlayerPos.y += 1;
        break;
      case 'left':
        Player.PlayerPos.x -= 1;
        break;
      case 'right':
        Player.PlayerPos.x += 1;
        break;
      default:
        break;
    }
    return Player;
  },
};
