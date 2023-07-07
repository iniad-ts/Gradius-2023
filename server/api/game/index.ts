export type Methods = {
  get: {
    resBody: string;
  };
  post: {
    reqBody: { x: number; y: number; key: string; board: number[][] };
    resBody: { x: number; y: number; board: number[][] };
  };
};
