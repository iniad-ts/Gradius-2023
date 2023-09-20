import type { EntityModel } from '../../commonTypesWithClient/models';

export const toEntityType = (entity: EntityModel) => {
  if (!('createdPos' in entity)) {
    return 'player';
  } else if ('side' in entity) {
    return 'bullet';
  } else {
    return 'enemy';
  }
};
