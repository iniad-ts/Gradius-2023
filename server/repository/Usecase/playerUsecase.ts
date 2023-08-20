//これが必要かは微妙
export type MoveDirection = 'up' | 'down' | 'left' | 'right';

export type GameState = 'wait_start' | 'playing' | 'stop' | 'gameover' | 'clear';
export let game_state: GameState = 'wait_start';
const game_state_list: GameState[] = ['wait_start', 'playing', 'stop'];
export const change_state = {
  change_game_state: async (change_state: number) => {
    game_state = game_state_list[change_state];
    return game_state;
  },
};

type Player_Info = {
  pos: { x: number; y: number };
  speed: number;
  hp: number;
  scole: number;
  // userid: UserId;
};

//仮初期値
//playerを画面の左真ん中からスタートさせるには以下の初期値が適切
//＊stageサイズによって変更する必要在り
//変数にして自動で調節するようにしてもいいかも
const player_first_pos: number[] = [100, 300];
const player_speed = 10;
const player_hp = 100;
const player_scole = 0;

export const player_info: Player_Info = {
  pos: { x: player_first_pos[0], y: player_first_pos[1] },
  speed: player_speed,
  hp: player_hp,
  scole: player_scole,
};

export const player_now_position: number[] = [100, 300];

//配列を直で渡せばこの処理自体いらない,要修正
export const playerUsecase = {
  moveplayer: async (movedirection: MoveDirection) => {
    if (movedirection === 'up') {
      player_info.pos.y = player_info.pos.y - player_info.speed;
      return;
    } else if (movedirection === 'down') {
      player_info.pos.y = player_info.pos.y + player_info.speed;
      return;
    } else if (movedirection === 'left') {
      player_info.pos.x = player_info.pos.x - player_info.speed;
      return;
    } else if (movedirection === 'right') {
      player_info.pos.x = player_info.pos.x + player_info.speed;
      return;
    }
  },
};
