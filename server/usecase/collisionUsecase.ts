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
    return entities.filter((entity) => Math.floor(entity.pos.x / 1920) === i);
  });

  const dividedEntitiesByQuad = dividedEntitiesByDisplay
    .flatMap((entities) => {
      return [
        entities.filter((entity) => Math.round(entity.pos.y / 1080 - 0.1) === 0),
        entities.filter((entity) => Math.round(entity.pos.y / 1080 + 0.1) === 1),
      ].flatMap((entities) => {
        return [
          entities.filter((entity) => Math.round((entity.pos.x % 1920) / 1920 - 0.1) === 0),
          entities.filter((entity) => Math.round((entity.pos.x % 1920) / 1920 + 0.1) === 1),
        ];
      });
    })
    .flatMap((entities) => {
      return [
        entities.filter((entity) => Math.round((entity.pos.y % 540) / 540 - 0.1) === 0),
        entities.filter((entity) => Math.round((entity.pos.y % 540) / 540 + 0.1) === 1),
      ].flatMap((entities) => {
        return [
          entities.filter((entity) => Math.round((entity.pos.x % 960) / 960 - 0.1) === 0),
          entities.filter((entity) => Math.round((entity.pos.x % 960) / 960 + 0.1) === 1),
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
    player: 50,
    enemy: 40,
    bullet: 7,
  };

  const targetType1 = entityType(target1);
  const targetType2 = entityType(target2);

  const distanceSquared =
    (target1.pos.x - target2.pos.x) ** 2 + (target1.pos.y - target2.pos.y) ** 2;
  const collisionDistanceSquared = (entityRadius[targetType1] + entityRadius[targetType2]) ** 2;

  return distanceSquared < collisionDistanceSquared;
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
            !(entityType(entity1) === 'enemy' && entityType(entity2) === 'enemy'),
            (entity1 as PlayerModel | BulletModel).side !==
              (entity2 as PlayerModel | BulletModel).side,
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
