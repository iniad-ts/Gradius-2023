import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../commonConstantsWithClient';
import type { EntityModel } from '../../commonTypesWithClient/models';

export const divideTo16InDisplayArray = async (entities: EntityModel[], displayNumber: number) => {
  const dividedEntitiesByDisplay = [...Array(displayNumber)].map((_, i) => {
    return entities.filter((entity) => Math.floor(entity.pos.x / SCREEN_WIDTH) === i);
  });

  const inDisplayEntitiesDivideTo16 = (entities: EntityModel[], index: number) =>
    [...Array(4)]
      .map((_, y) =>
        entities.filter(
          (entity) =>
            entity.pos.y + 100 >= y * (SCREEN_HEIGHT / 4) &&
            entity.pos.y - 100 <= (y + 1) * (SCREEN_HEIGHT / 4)
        )
      )
      .map((row) =>
        [...Array(4)].map((_, x) =>
          row.filter(
            (entity) =>
              entity.pos.x + 100 >= x * ((SCREEN_WIDTH * (index + 1)) / 4) &&
              entity.pos.x - 100 <= (x + 1) * ((SCREEN_WIDTH * (index + 1)) / 4)
          )
        )
      );

  const dividedEntitiesByQuad = dividedEntitiesByDisplay.map(inDisplayEntitiesDivideTo16);

  return dividedEntitiesByQuad.flat(2);
};
