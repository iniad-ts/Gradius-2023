import { BULLET_RADIUS, ENEMY_HALF_WIDTH, PLAYER_HALF_WIDTH } from '$/commonConstantsWithClient';
import type { EntityModel } from '../../commonTypesWithClient/models';
import { toEntityType } from './toEntityType';

export const isCollision = (target1: EntityModel, target2: EntityModel) => {
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
