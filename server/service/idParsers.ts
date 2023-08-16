import { z } from 'zod';
import type { RoomId, TaskId, UserId } from '../commonTypesWithClient/branded';

export const UserIdParser: z.ZodType<UserId> = z.string().brand<'UserId'>();

export const taskIdParser: z.ZodType<TaskId> = z.string().brand<'TaskId'>();

export const roomIdParser: z.ZodType<RoomId> = z.string().brand<'RoomId'>();
