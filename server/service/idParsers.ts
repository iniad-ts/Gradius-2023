import type {
  EnemyId,
  GameSessionId,
  PlayerId,
  PowerUpId,
  SessionsEnemiesId,
  StageId,
  UserId,
} from '$/commonTypesWithClient/branded';
import { z } from 'zod';

export const playerIdParser: z.ZodType<PlayerId> = z.string().brand<'PlayerId'>();

export const UserIdParser: z.ZodType<UserId> = z.string().brand<'UserId'>();

export const gameSessionIdParser: z.ZodType<GameSessionId> = z.string().brand<'GameSessionId'>();

export const enemyIdParser: z.ZodType<EnemyId> = z.string().brand<'EnemyId'>();

export const powerUpIdParser: z.ZodType<PowerUpId> = z.string().brand<'PowerUpId'>();

export const sessionsEnemiesIdParser: z.ZodType<SessionsEnemiesId> = z
  .string()
  .brand<'SessionsEnemiesId'>();

export const stageIdParser: z.ZodType<StageId> = z.string().brand<'StageId'>();
