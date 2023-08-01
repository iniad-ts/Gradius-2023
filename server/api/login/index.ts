export type Methods = {
  get: {
    resBody: string;
  };
  post: {
    reqBody: {
      userName: string;
    };
    resBody: {
      name: string;
    };
  };
};
