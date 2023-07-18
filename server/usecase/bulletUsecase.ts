export const bulletUsecase = {
  //xとyを保存するリスト
  bulletCount: 0,
  bulletPosList: [] as { x: number; y: number }[],
  bulletPosSave: (x: number, y: number) => {
    bulletUsecase.bulletPosList.push({ x, y });
    //list[n]を返す
    return bulletUsecase.bulletPosList[bulletUsecase.bulletCount++];
  },
};
