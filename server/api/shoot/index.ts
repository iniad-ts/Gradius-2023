export type Methods = {
  get: {
    resBody: boolean;
  };
  post: {
    reqBody: { x: number; y: number; isShooting: boolean };
  };
};
