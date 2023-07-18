export const bulletUsecase = {
  //xとyを保存するリスト
  bulletPosList: [] as { x: number; y: number }[],
  bulletPosSave: (x: number, y: number) => {
    bulletUsecase.bulletPosList.push({ x, y });
    return true;
  },
};
