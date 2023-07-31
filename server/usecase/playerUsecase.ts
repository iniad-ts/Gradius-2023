export type MoveDirection = 'up' | 'left' | 'right' | 'down' | 'push';

export const position: number[] = [30, 300];
export let gunPosition: number[][] = [[]];

export const gunShot = async () => {
  gunPosition.push([position[0] + 150, position[1] + 35]);
};

setInterval(() => {
  moveGun();
}, 5);

const moveGun = () => {
  const newGunPosition: number[][] = [];
  for (const s of gunPosition) {
    s[0] + 1 <= 1500 && newGunPosition.push([s[0] + 1, s[1]]);
  }
  gunPosition = newGunPosition;
  return gunPosition;
};

export const roomUsecase = (() => {
  return {
    pushbutton: async (movedirection: MoveDirection) => {
      let result = '';
      if (movedirection === 'push') {
        //球を打つ
        result = 'PUSH が入力されました';
        gunShot();
      } else if (movedirection === 'up') {
        //飛行機が上に上がる
        position[0] -= 50;
        result = 'UP が入力されました';
      } else if (movedirection === 'left') {
        //飛行機が左に移動
        position[1] -= 10;
        result = 'LEFT が入力されました';
      } else if (movedirection === 'right') {
        //飛行機が下に下がる
        position[1] += 10;
        result = 'RIGHT が入力されました';
      } else {
        //飛行機が下に下がる
        position[0] += 50;
        result = 'DOWN が入力されました';
      }
      return result;
    },
  };
})();
