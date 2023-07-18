export type MoveDirection = 'up' | 'left' | 'right' | 'down';
export let position: number[] = [30, 300]; //飛行機の位置を保存

export let gunPosition: number[][] = [[]];

export const make_laser = {
  shot: async () => {
    gunPosition.push([position[0] + 50, position[1] - 5]);
  },
};

setInterval(() => {
  moveGun();
}, 25);

const moveGun = () => {
  const newGunPosition: number[][] = [];
  for (const one_laser_pos of gunPosition) {
    one_laser_pos[0] + 1 <= 1100 && newGunPosition.push([one_laser_pos[0] + 1, one_laser_pos[1]]);
  }
  gunPosition = newGunPosition;
  return gunPosition;
};
export const roomUsecase = (() => {
  return {
    gunshot: async (string: 'push') => {
      let result;
      if (string === 'push') {
        result = 'PUSH が入力されました';
        make_laser.shot();
      }
      return result;
    },
    pushbutton: async (movedirection: MoveDirection) => {
      let result;
      if (movedirection === 'up') {
        //飛行機が上に上がる
        result = 'UP が入力されました';
        position = [position[0], position[1] - 50];
      } else if (movedirection === 'left') {
        //飛行機が左に移動
        result = 'LEFT が入力されました';
        position = [position[0] - 10, position[1]];
      } else if (movedirection === 'right') {
        //飛行機が下に下がる
        result = 'RIGHT が入力されました';
        position = [position[0] + 10, position[1]];
      } else {
        //飛行機が下に下がる
        result = 'DOWN が入力されました';
        position = [position[0], position[1] + 50];
      }
      return result;
    },
  };
})();
