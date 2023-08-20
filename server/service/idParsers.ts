import { z } from 'zod';
import type { EnemyId } from '../commonTypesWithClient/branded';
import { type TaskId, type UserId } from '../commonTypesWithClient/branded';

const createIdParser = <T extends string>() => z.string() as unknown as z.ZodType<T>;

export const userIdParser = createIdParser<UserId>();

export const taskIdParser = createIdParser<TaskId>();

export const enemyIdParser = createIdParser<EnemyId>();
