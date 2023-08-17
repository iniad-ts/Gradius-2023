import type { playerModel } from '$/commonTypesWithClient/models';

export type MoveDirection = 'up' | 'left' | 'right' | 'down' | 'push';
// pushって何？forはるき＃かきのき

export const position: number[][] = [[50, 500]];
export let gunPosition: number[][] = [[]];

export const player_info: playerModel[] = [];
// export const positions: playerModel = player_info[player_info.length - 1];

// export const position: [number, number] = [positions.pos.x, positions.pos.y];

// //playerの初期値
// let player_pos_x = 30;
// let player_pos_y = 300;
// const player_hp = 100;
// const player_score = 0;
// const player_radius = 5;
// const player_speed = 5;

// const player = () => {
//   const new_player_info: playerModel = {
//     pos: { x: player_pos_x, y: player_pos_y },
//     hp: player_hp,
//     score: player_score,
//     radius: player_radius,
//     speed: player_speed,
//   };
//   player_info.push(new_player_info);
// };

// setInterval(() => {
//   player();
// }, 250);
export const gunShot = async () => {
  console.log('gunShot動作');
  gunPosition.push([position[0][0] + 50, position[0][1] + 25]);
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
        position[0][1] -= 50;
        result = 'UP が入力されました';
      } else if (movedirection === 'left') {
        //飛行機が左に移動
        position[0][0] -= 10;
        result = 'LEFT が入力されました';
      } else if (movedirection === 'right') {
        //飛行機が下に下がる
        position[0][0] += 10;
        result = 'RIGHT が入力されました';
      } else {
        //飛行機が下に下がる
        position[0][1] += 50;
        result = 'DOWN が入力されました';
      }
      return result;
    },
  };
})();
