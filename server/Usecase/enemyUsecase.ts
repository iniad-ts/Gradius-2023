export type EnemyPos = {
  x: number;
  y: number;
};

export type Enemy = {
  EnemyPos: EnemyPos;
  radius: number;
};

export const enemyUsecase = {
  randommove: (Enemy: Enemy) => {
    const random = Math.floor(Math.random() * 4);
    switch (random) {
      case 0:
        Enemy.EnemyPos.y -= 10;
        break;
      case 1:
        Enemy.EnemyPos.y += 10;
        break;
      case 2:
        Enemy.EnemyPos.x -= 10;
        break;
      case 3:
        Enemy.EnemyPos.x += 10;
        break;
      default:
        break;
    }
    return Enemy;
  },
  verticalMove: (Enemy: Enemy) => {
    Enemy.EnemyPos.y += 10;
    return Enemy;
  },
  horizontalMove: (Enemy: Enemy) => {
    Enemy.EnemyPos.x -= 10;
    return Enemy;
  },
};
