import type { EnemyId } from '$/commonTypesWithClient/branded';
import type { EnemyModel } from '$/commonTypesWithClient/models';
import { enemiesRepository } from '$/repository/enemiesRepository';
import { randomUUID } from 'crypto';
import { gameUseCase } from './gameUseCase';

const spawnEnemy = async (): Promise<EnemyModel> => {
  const randomPosY = Math.floor(Math.random() * 700);
  const newEnemy: EnemyModel = {
    id: randomUUID() as EnemyId,
    createdAt: Date.now(),
    updateAt: Date.now(),
    position: {
      x: 1000,
      y: randomPosY,
    },
    health: 1,
    speed: 5,
    radius: 20,
    direction: 0,
    type: 0,
    gameId: await gameUseCase.findGameId(),
  };
  enemiesRepository.save(newEnemy);
  return newEnemy;
};

const removeOutedEnemy = async (enemy: EnemyModel) => {
  const isOuted =
    enemy.position.x < 0 ||
    enemy.position.y < 0 ||
    enemy.position.x > 1000 ||
    enemy.position.y > 700;
  if (isOuted) {
    enemiesRepository.delete(enemy.id);
  }
};

const moveEnemy = async (enemy: EnemyModel) => {
  const movedEnemy: EnemyModel = {
    ...enemy,
    position: {
      x: enemy.position.x - enemy.speed * Math.cos(enemy.direction),
      y: enemy.position.y - enemy.speed * Math.sin(enemy.direction),
    },
    updateAt: Date.now(),
  };
  enemiesRepository.save(movedEnemy);
  removeOutedEnemy(movedEnemy);
};

const cancelSpawnInterval = setInterval(spawnEnemy, 1000);
const cancelMoveInterval = setInterval(async () => {
  const enemies: EnemyModel[] = (await enemiesRepository.getAll()) ?? [];
  enemies.forEach(moveEnemy);
}, 10);
