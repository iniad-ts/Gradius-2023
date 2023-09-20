import { DISPLAY_COUNT } from '$/commonConstantsWithClient';
import type { BulletModelWithPos, EntityModel } from '$/commonTypesWithClient/models';
import { bulletRepository } from '$/repository/bulletRepository';
import { enemyRepository } from '$/repository/enemyRepository';
import { entityChangeWithPos } from '$/service/entityChangeWithPos';
import { userIdParser } from '$/service/idParsers';
import { itemDraw } from '$/service/item/itemDraw';
import { divideTo16InDisplayArray } from './@service/divideTo16InDisplayArray';
import { isCollision } from './@service/isCollision';
import { isOtherSide } from './@service/isOtherSide';
import { enemyUseCase } from './enemyUsecase';
import { playerUseCase } from './playerUsecase';

let intervalId: NodeJS.Timeout | null = null;

//ANCHOR - checkCollisions
const checkCollisions = async () => {
  const entities = await Promise.all([
    playerUseCase.getAllPlayers(),
    enemyUseCase.getAllEnemies(),
    bulletRepository.findAll(),
  ]).then(([players, enemies, bullets]) => [
    ...players,
    ...enemies,
    ...bullets.map(entityChangeWithPos),
  ]);

  const dividedEntities: EntityModel[][] = await divideTo16InDisplayArray(entities, DISPLAY_COUNT);

  const collisions = dividedEntities.flatMap((oneSectionInEnemies) =>
    oneSectionInEnemies.flatMap((entity1) => {
      const collisionEntities = oneSectionInEnemies.filter(
        (entity2) =>
          entity1.id !== entity2.id &&
          isOtherSide(entity1, entity2) &&
          isCollision(entity1, entity2)
      );
      return collisionEntities.map((entity2): [EntityModel, EntityModel] => [entity1, entity2]);
    })
  );

  const handleHitBullet = (entity: BulletModelWithPos) => {
    bulletRepository.delete(entity.id);
    playerUseCase.addScore(userIdParser.parse(entity.shooterId), 150);
    if (Math.random() < 0.1) {
      playerUseCase.addItem(userIdParser.parse(entity.shooterId), itemDraw());
    }
  };

  const handleEntity = (entity: EntityModel) => {
    if ('score' in entity) {
      return playerUseCase.addScore(entity.id, -100);
    } else if ('side' in entity) {
      return handleHitBullet(entity);
    } else {
      return enemyRepository.delete(entity.id);
    }
  };

  await Promise.all(
    collisions.map(([entity1, entity2]) => {
      handleEntity(entity1);
      handleEntity(entity2);
    })
  );
};

export const collisionUseCase = {
  init: () => {
    intervalId = setInterval(async () => {
      checkCollisions();
    }, 50);
  },
  stop: () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  },
};
