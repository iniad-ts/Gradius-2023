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
  owner: string | null;
  type: string;
  xyz: number[];
  vector: number[];
  speed: number;
  hp: number;
  lv: number;
  started: number;
  end: number | null;
};

export type EventModel = {
  owner: string;
  items: string[];
  kill: number;
  damage: number;
  damaged: number;
};
