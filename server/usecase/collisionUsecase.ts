import {
  BULLET_RADIUS,
  ENEMY_HALF_WIDTH,
  PLAYER_HALF_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '$/commonConstantsWithClient';
import type { BulletModel, EnemyModel, PlayerModel } from '$/commonTypesWithClient/models';
import { bulletRepository } from '$/repository/bulletRepository';
import { enemyRepository } from '$/repository/enemyRepository';
import { gameRepository } from '$/repository/gameRepository';
import { playerRepository } from '$/repository/playerRepository';
import { playerUseCase } from './playerUsecase';

type EntityModel = PlayerModel | EnemyModel | BulletModel;

let intervalId: NodeJS.Timeout | null = null;

const divide = async (entities: EntityModel[], displayNumber: number) => {
  const dividedEntitiesByDisplay = [...Array(displayNumber)].map((_, i) => {
    return entities.filter((entity) => Math.floor(entity.pos.x / SCREEN_WIDTH) === i);
  });

  const dividedEntitiesByQuad = dividedEntitiesByDisplay
    .flatMap((entities) => {
      return [
        entities.filter((entity) => Math.round(entity.pos.y / SCREEN_HEIGHT - 0.1) === 0),
        entities.filter((entity) => Math.round(entity.pos.y / SCREEN_HEIGHT + 0.1) === 1),
      ].flatMap((entities) => {
        return [
          entities.filter(
            (entity) => Math.round((entity.pos.x % SCREEN_WIDTH) / SCREEN_WIDTH - 0.1) === 0
          ),
          entities.filter(
            (entity) => Math.round((entity.pos.x % SCREEN_WIDTH) / SCREEN_WIDTH + 0.1) === 1
          ),
        ];
      });
    })
    .flatMap((entities) => {
      return [
        entities.filter(
          (entity) =>
            Math.round((entity.pos.y % (SCREEN_HEIGHT / 2)) / (SCREEN_HEIGHT / 2) - 0.1) === 0
        ),
        entities.filter(
          (entity) =>
            Math.round((entity.pos.y % (SCREEN_HEIGHT / 2)) / (SCREEN_HEIGHT / 2) + 0.1) === 1
        ),
      ].flatMap((entities) => {
        return [
          entities.filter(
            (entity) =>
              Math.round((entity.pos.x % (SCREEN_WIDTH / 2)) / (SCREEN_WIDTH / 2) - 0.1) === 0
          ),
          entities.filter(
            (entity) =>
              Math.round((entity.pos.x % (SCREEN_WIDTH / 2)) / (SCREEN_WIDTH / 2) + 0.1) === 1
          ),
        ];
      });
    });

  return dividedEntitiesByQuad;
};

const entityType = (entity: EntityModel) => {
  if ('userId' in entity) {
    return 'player';
  } else if ('enemyId' in entity) {
    return 'enemy';
  } else {
    return 'bullet';
  }
};

const isCollision = (target1: EntityModel, target2: EntityModel) => {
  const entityRadius = {
    player: PLAYER_HALF_WIDTH,
    enemy: ENEMY_HALF_WIDTH,
    bullet: BULLET_RADIUS,
  };

  const targetType1 = entityType(target1);
  const targetType2 = entityType(target2);

  const distanceSquared =
    (target1.pos.x - target2.pos.x) ** 2 + (target1.pos.y - target2.pos.y) ** 2;
  const collisionDistanceSquared = (entityRadius[targetType1] + entityRadius[targetType2]) ** 2;

  return distanceSquared < collisionDistanceSquared;
};

const isOtherSide = (target1: EntityModel, target2: EntityModel) => {
  const types = [target1, target2].map(entityType);
  if (types.includes('enemy')) return true;

  return (
    (target1 as PlayerModel | BulletModel).side !== (target2 as PlayerModel | BulletModel).side
  );
};

const isAnotherEntity = (target1: EntityModel, target2: EntityModel) => {
  const id1 =
    'userId' in target1
      ? target1.userId
      : 'enemyId' in target1
      ? target1.enemyId
      : target1.bulletId;
  const id2 =
    'userId' in target2
      ? target2.userId
      : 'enemyId' in target2
      ? target2.enemyId
      : target2.bulletId;

  return id1 !== id2;
};

const checkCollisions = async () => {
  const entities = await Promise.all([
    playerRepository.findAll(),
    enemyRepository.findAll(),
    bulletRepository.findAll(),
  ]).then(([players, enemies, bullets]) => [...players, ...enemies, ...bullets]);

  const displayNumber = await gameRepository.find().then((games) => games?.displayNumber ?? 1);

  const dividedEntities = await divide(entities, displayNumber);

  const collisions = dividedEntities.flatMap((entities) => {
    return entities.flatMap((entity1) => {
      return entities
        .filter((entity2) => {
          const terms = [
            isAnotherEntity(entity1, entity2),
            isOtherSide(entity1, entity2),
            isCollision(entity1, entity2),
          ];
          return terms.every(Boolean);
        })
        .flatMap((entity2) => [entity1, entity2]);
    });
  });

  await Promise.all(
    collisions.map((entity) => {
      if ('userId' in entity) {
        return playerUseCase.addScore(entity.userId, -100);
      } else if ('enemyId' in entity) {
        return enemyRepository.delete(entity.enemyId);
      } else {
        return bulletRepository.delete(entity.bulletId);
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
