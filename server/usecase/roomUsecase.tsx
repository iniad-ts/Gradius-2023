export type MoveDirection = 'up' | 'left' | 'right' | 'down' | 'push';
export let position: number[] = [30, 300]; //飛行機の位置を保存

export let gun = false;

export const roomUsecase = (() => {
  const resetGun = () => {
    gun = false;
  };

  return {
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
      } else if (movedirection === 'down') {
        //飛行機が下に下がる
        result = 'DOWN が入力されました';
        position = [position[0], position[1] + 50];
      } else {
        //飛行機が下に下がる
        result = 'PUSH が入力されました';
        gun = true;
        //2秒経ったら、gunのtrueをfalseに変える。
        setTimeout(resetGun, 5000);
      }
      return result;
    },
  };
})();
