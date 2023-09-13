import { z } from 'zod';
import type { BulletId, EnemyId } from '../commonTypesWithClient/branded';
import { type TaskId, type UserId } from '../commonTypesWithClient/branded';

const createIdParser = <T extends string>() => z.string() as unknown as z.ZodType<T>;

export const userIdParser = createIdParser<UserId>();

export const taskIdParser = createIdParser<TaskId>();

export const enemyIdParser = createIdParser<EnemyId>();

export const bulletIdParser = createIdParser<BulletId>();
