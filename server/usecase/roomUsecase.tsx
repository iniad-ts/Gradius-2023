export type MoveDirection = '1' | '2';
export let position: number[] = [30, 300];
export const roomUsecase = (() => {
  return {
    pushbutton: async (movedirection: MoveDirection) => {
      let result;
      if (movedirection === '1') {
        //飛行機が上に上がる
        result = 'aは1';
        position = [position[0], position[1] - 50];
      } else {
        //飛行機が下に下がる
        result = 'aは2';
        position = [position[0], position[1] + 50];
      }
      return result;
    },
  };
})();
