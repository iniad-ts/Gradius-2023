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
  createdAt: number;
  updateAt: number;
};

export type PlayerModel = {
  id: UserId;
  name: string;
  createdAt: number;
  updateAt: number;
  position: {
    x: number;
    y: number;
  };
  health: number;
  score: number;
  gameId: GameId;
};

export type BulletModel = {
  id: BulletId;
  createdAt: number;
  updateAt: number;
  direction: number;
  createdPosition: {
    x: number;
    y: number;
  };
  speed: number;
  exists: boolean;
  gameId: GameId;
  playerId: UserId | null;
};

export type EnemyModel = {
  id: EnemyId;
  createdAt: number;
  updateAt: number;
  position: {
    x: number;
    y: number;
  };
  health: number;
  speed: number;
  direction: number;
  type: number;
  gameId: GameId;
};
