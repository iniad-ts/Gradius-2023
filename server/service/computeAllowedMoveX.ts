import {
  ALLOW_MOVE_RANGE_HALF_WIDTH,
  ALLOW_MOVE_RANGE_MOVE_SPEED,
  DISPLAY_COUNT,
  SCREEN_WIDTH,
} from '../commonConstantsWithClient';
import type { PlayerModel } from '../commonTypesWithClient/models';
import { diffToBaseTimeSec } from './diffToBaseTimeSec';
import { minMax } from './minMax';
import { sideToDirectionX } from './sideToDirectionX';

export const computeAllowedMoveX = (player: PlayerModel) => {
  const SIDE = sideToDirectionX(player.side);
  const BASE_X = -Math.min(0, SIDE) * SCREEN_WIDTH * DISPLAY_COUNT;
  const DIFF = diffToBaseTimeSec(player);
  const CENTER_X = BASE_X + DIFF * ALLOW_MOVE_RANGE_MOVE_SPEED * SIDE;
  return minMax(
    player.pos.x,
    -ALLOW_MOVE_RANGE_HALF_WIDTH + CENTER_X,
    ALLOW_MOVE_RANGE_HALF_WIDTH + CENTER_X
  );
};
