export const roomUsecase = (() => {
  let count = 0;

  return {
    pushbutton: async (a: 1 | 2): Promise<string> => {
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

    airplaneHeight: async (): Promise<number> => {
      const height = 300 + count * 50;
      return height;
    },
  };
})();
