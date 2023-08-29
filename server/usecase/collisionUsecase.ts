import { bulletRepository } from '$/repository/bulletRepository';
import { enemyRepository } from '$/repository/enemyRepository';
import { playerRepository } from '$/repository/playerRepository';
let intervalId: NodeJS.Timeout | null = null;
export const collisionUsecase = {
  init: () => {
    intervalId = setInterval(() => {
      collisionUsecase.checkCollisonPlayerAndEnemy();
      collisionUsecase.checkCollisonBulletAndEnemy();
    }, 500);
  },
  stop: () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  },
  //playerとenemyのあたり判定
  checkCollisonPlayerAndEnemy: async () => {
    const currentPlayerInfo = await playerRepository.findAll();
    const currentEnemyInfo = await enemyRepository.findAll();
    currentPlayerInfo.forEach((player) => {
      currentEnemyInfo.forEach((enemy) => {
        const distanceSquared =
          (player.pos.x - enemy.pos.x) ** 2 + (player.pos.y - enemy.pos.y) ** 2;
        if (distanceSquared < 10000) {
          console.log('bbbb');
          enemyRepository.delete(enemy.enemyId);
        }
      });
    });
  },
  //bulletとenemyのあたり判定
  checkCollisonBulletAndEnemy: async () => {
    const currentBulletInfo = await bulletRepository.findAll();
    const currentEnemyInfo = await enemyRepository.findAll();
    currentBulletInfo.forEach((bullet) => {
      currentEnemyInfo.forEach((enemy) => {
        const distanceSquared =
          (bullet.pos.x - enemy.pos.x) ** 2 + (bullet.pos.y - enemy.pos.y) ** 2;
        if (distanceSquared < 5000) {
          console.log('bbbb');
          enemyRepository.delete(enemy.enemyId);
          bulletRepository.delete(bullet.bulletId);
        }
      });
    });
  },
};
