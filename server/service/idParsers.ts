import { z } from 'zod';
import type { BulletId, EnemyId, GameId, TaskId, UserId } from '../commonTypesWithClient/branded';

export const UserIdParser: z.ZodType<UserId> = z.string().brand<'UserId'>();

export const taskIdParser: z.ZodType<TaskId> = z.string().brand<'TaskId'>();

export const gameIdParser: z.ZodType<GameId> = z.string().brand<'GameId'>();

export const enemyIdParser: z.ZodType<EnemyId> = z.string().brand<'EnemyId'>();

export const bulletIdParser: z.ZodType<BulletId> = z.string().brand<'BulletId'>();
