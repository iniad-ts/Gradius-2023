export type Methods = {
  get: {
    resBody: { x: number; y: number };
  };
  post: {
    // reqBody: { x: number; y: number; key: string };
    reqBody: { key: string };
    resBody: { x: number; y: number };
  };
};
