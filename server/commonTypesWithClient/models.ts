import type { BulletId, EnemyId, GameId, TaskId, UserId } from './branded';

export type UserModel = {
  id: UserId;
  email: string;
  displayName: string | undefined;
  photoURL: string | undefined;
};

export type TaskModel = {
  id: TaskId;
  label: string;
  done: boolean;
  created: number;
};

export type GameModel = {
  id: GameId;
  displayNumber: number;
  createdAt: number;
};

export type PlayerModel = {
  id: UserId;
  name: string;
  position: {
    x: number;
    y: number;
  };
  health: number;
  score: number;
  team: string;
  createdAt: number;
  gameId: GameId;
};

export type EnemyModel = {
  id: EnemyId;
  createdPosition: {
    x: number;
    y: number;
  };
  type: number;
  createdAt: number;
  gameId: GameId;
};

export type BulletModel = {
  id: BulletId;
  createdPosition: {
    x: number;
    y: number;
  };
  direction: number;
  type: number;
  playerId?: UserId;
  createdAt: number;
  gameId: GameId;
};
