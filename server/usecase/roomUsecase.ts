export const roomUsecase = {
  pushbutton: async (a: number): Promise<string> => {
    let result;
    if (a === 1) {
      result = 'aは1です';
    } else {
      result = 'aは2です';
    }
    return result;
  },
  moveShatle: async () => {
    // if (a === 1)
  },
};
