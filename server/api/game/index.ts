export type Methods = {
  get: {
    resBody: string;
  };
  post: {
    reqBody: { x: number; y: number; key: string };
    resBody: { x: number; y: number };
  };
};
