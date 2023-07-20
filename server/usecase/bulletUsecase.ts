export const bulletUsecase = {
  isShooting: false,
  lastShotTime: 0,
  bulletCount: 0,
  bulletPosList: [] as { x: number; y: number }[],
  bulletPosSave: (x: number, y: number, isShootingReq: boolean) => {
    const currentTime = Date.now();
    if (!isShootingReq && currentTime - bulletUsecase.lastShotTime > 300) {
      bulletUsecase.isShooting = false;
      bulletUsecase.lastShotTime = currentTime;
    } else if (isShootingReq) {
      bulletUsecase.isShooting = true;
    }
    bulletUsecase.bulletPosList.push({ x, y });
    bulletUsecase.bulletCount++;
  },
  getIsShooting: () => {
    return bulletUsecase.isShooting;
  },
};
