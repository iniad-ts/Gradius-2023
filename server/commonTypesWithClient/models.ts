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
};

export type EnemyModel = {
  id: EnemyId;
  createdPosition: {
    x: number;
    y: number;
  };
  type: number;
  createdAt: number;
  deletedAt: number | null;
};

export type EnemyTableModel = {
  createPosition: {
    x: number;
    y: number;
  };
  type: number;
};

export type BulletModel = {
  id: BulletId;
  createdPosition: {
    x: number;
    y: number;
  };
  direction: {
    x: number;
    y: number;
  };
  type: number;
  playerId?: UserId;
  createdAt: number;
};

export type LockOnModel = {
  pos: { x: number; y: number };
  squaredDistance: number;
};
