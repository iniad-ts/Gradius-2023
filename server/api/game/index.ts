import type { TaskModel } from "$/commonTypesWithClient/models";

export type Methods = {
  get: {
    resBody: string
  }
  post: {
    reqBody: {label:number};
    resBody: number;
  };
}
