import type { TaskId, UserId } from './branded';

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
  name: string;
  xyz: number[];
  hp: number;
  lv: number;
};

export type EventModel = {
  name: string;
  started: Date;
  level: number;
  kill: number;
  damage: number;
  damaged: number;
  end: Date | null;
};
