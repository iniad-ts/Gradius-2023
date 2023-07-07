// 敵の動き方をコントロールする
export const enemyUsecase = {
  move: (y:number) => {
    const increment = Math.random() < 0.5 ? -15 : 15;
    let newY = y + increment;
    if (newY < 0) {
      newY = 0;
    } else if (newY > 720) {
      newY = 720;
    }
    return {y:newY};
  },
};