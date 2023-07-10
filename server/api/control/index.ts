export type Methods = {
  get: {
    resBody: string;
  };
  post: {
    resBody: { x: number; y: number };
    reqBody: { x: number; y: number; KeyEvent: string };
  };
};
