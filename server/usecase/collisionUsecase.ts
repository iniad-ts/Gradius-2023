import { BULLET_RADIUS, DISPLAY_COUNT, ENEMY_HALF_WIDTH, PLAYER_HALF_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from '$/commonConstantsWithClient';
import type { BulletModel, BulletModelWithPos, EntityModel, PlayerModel } from '$/commonTypesWithClient/models';
import { bulletRepository } from '$/repository/bulletRepository';
import { enemyRepository } from '$/repository/enemyRepository';
import { entityChangeWithPos } from '$/service/entityChangeWithPos';
import { userIdParser } from '$/service/idParsers';
import { itemDraw } from '$/service/item/itemDraw';
import { enemyUseCase } from './enemyUsecase';
import { playerUseCase } from './playerUsecase';

let intervalId: NodeJS.Timeout | null = null;

const divideTo16InDisplayArray = async (entities: EntityModel[], displayNumber: number) => {
  const dividedEntitiesByDisplay = [...Array(displayNumber)].map((_, i) => {
    return entities.filter((entity) => Math.floor(entity.pos.x / SCREEN_WIDTH) === i);
  });

  const inDisplayEntitiesDivideTo16 = (entities: EntityModel[], index: number) =>
    [...Array(4)]
      .map((_, y) =>
        entities.filter((entity) =>
          [
            entity.pos.y + 100 >= y * (SCREEN_HEIGHT / 4),
            entity.pos.y - 100 <= (y + 1) * (SCREEN_HEIGHT / 4),
          ].every(Boolean)
        )
      )
      .map((row) =>
        [...Array(4)].map((_, x) =>
          row.filter((entity) =>
            [
              entity.pos.x + 100 >= x * ((SCREEN_WIDTH * (index + 1)) / 4),
              entity.pos.x - 100 <= (x + 1) * ((SCREEN_WIDTH * (index + 1)) / 4),
            ].every(Boolean)
          )
        )
      );

  const dividedEntitiesByQuad = dividedEntitiesByDisplay.map(inDisplayEntitiesDivideTo16);

  return dividedEntitiesByQuad.flat(2);
};

const toEntityType = (entity: EntityModel) => {
  if (!('createdPos' in entity)) {
    return 'player';
  } else if ('side' in entity) {
    return 'bullet';
  } else {
    return 'enemy';
  }
};

const isCollision = (target1: EntityModel, target2: EntityModel) => {
  const ENTITY_RADIUS = {
    player: PLAYER_HALF_WIDTH,
    enemy: ENEMY_HALF_WIDTH,
    bullet: BULLET_RADIUS,
  };

  const targetType1 = toEntityType(target1);
  const targetType2 = toEntityType(target2);

  const distanceSquared =
    (target1.pos.x - target2.pos.x) ** 2 + (target1.pos.y - target2.pos.y) ** 2;
  const collisionDistanceSquared = (ENTITY_RADIUS[targetType1] + ENTITY_RADIUS[targetType2]) ** 2;

  return distanceSquared < collisionDistanceSquared;
};

const isOtherSide = (target1: EntityModel, target2: EntityModel) => {
  const types = [target1, target2].map(toEntityType);
  if (types.includes('enemy')) return true;

  return (
    (target1 as PlayerModel | BulletModel).side !== (target2 as PlayerModel | BulletModel).side
  );
};

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

  const collisions = dividedEntities.flatMap((entities) => {
    return entities.flatMap((entity1) => {
      return entities
        .filter((entity2) => {
          const terms = [
            entity1.id !== entity2.id,
            isOtherSide(entity1, entity2),
            isCollision(entity1, entity2),
          ];
          return terms.every(Boolean);
        })
        .flatMap((entity2) => [entity1, entity2]);
    });
  });

  const handleHitBullet = (entity: BulletModelWithPos) => {
    bulletRepository.delete(entity.id);
    playerUseCase.addScore(userIdParser.parse(entity.shooterId), 150);
    if (Math.random() < 0.1) {
      playerUseCase.addItem(userIdParser.parse(entity.shooterId), itemDraw());
    }
  };

  await Promise.all(
    collisions.map((entity) => {
      if ('score' in entity) {
        return playerUseCase.addScore(entity.id, -100);
      } else if ('side' in entity) {
        return handleHitBullet(entity);
      } else {
        return enemyRepository.delete(entity.id);
      }
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
