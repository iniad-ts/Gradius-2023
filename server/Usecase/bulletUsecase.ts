import type { Player } from '$/Usecase/playerUsecase';
export type Bullet = {
  x: number;
  y: number;
  speed: number;
  radius: number;
};

export const bulletUsecase = {
  shoot: (Player: Player) => {
    const Bullet: Bullet = {
      x: Player.PlayerPos.x,
      y: Player.PlayerPos.y,
      speed: 15,
      radius: 5,
    };

    return Bullet;
  },
};
