export const roomUsecase = (() => {
  let count = 0;

  return {
    pushbutton: async (a: number): Promise<string> => {
      let result;
      if (a === 1) {
        result = 'aは1';
        count -= 1;
      } else {
        result = 'aは2';
        count += 1;
      }
      return result;
    },

    shatoleHight: async (): Promise<number> => {
      const height = count * 50;
      return height;
    },
  };
})();
