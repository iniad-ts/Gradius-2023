import type { z } from 'zod';

type Branded<T extends string> = string & z.BRAND<T>;

export type UserId = Branded<'UserId'>;

export type TaskId = Branded<'TaskId'>;

export type GameSessionId = Branded<'GameSessionId'>;

export type PlayerId = Branded<'PlayerId'>;

export type EnemyId = Branded<'EnemyId'>;

export type PowerUpId = Branded<'PowerUpId'>;

export type SessionsEnemiesId = Branded<'SessionsEnemiesId'>;

export type StageId = Branded<'StageId'>;
