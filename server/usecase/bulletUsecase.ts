export const bulletUsecase = {
  isShooting: false,
  //xとyを保存するリスト
  bulletCount: 0,
  bulletPosList: [] as { x: number; y: number }[],
  bulletPosSave: (x: number, y: number, isShootingReq: boolean) => {
    bulletUsecase.isShooting = isShootingReq;
    bulletUsecase.bulletPosList.push({ x, y });
    bulletUsecase.bulletCount++;
    return true;
  },
  getIsShooting: () => {
    return bulletUsecase.isShooting;
  },
};
