import type {
  BulletModel,
  BulletModelWithPos,
  EnemyModel,
  EnemyModelWithPos,
} from '$/commonTypesWithClient/models';
import { computePosition } from './computePositions';

type EntityModel = EnemyModel | BulletModel;

export const entityChangeWithPos = (
  entity: EntityModel
): EnemyModelWithPos | BulletModelWithPos => {
  const pos = computePosition(entity);
  if ('side' in entity)
    return {
      id: entity.id,
      pos,
      side: entity.side,
      createdAt: entity.createdAt,
      shooterId: entity.shooterId,
    } as BulletModelWithPos;
  else
    return {
      id: entity.id,
      pos,
      type: entity.type,
    } as EnemyModelWithPos;
};
