//ここにコントローラー画面を作る

import type { MoveDirection } from '$/repository/Usecase/playerUsecase';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { userAtom } from 'src/atoms/user';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';
import styles from './gradius_controller.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [change_count, setchange_count] = useState(2);
  const game_state_list: string[] = ['playing', 'stop', 'start'];
  if (!user) return <Loading visible />;

  //移動方向serveにpost req
  const order_to_direction = async (direction: MoveDirection) => {
    const ordered_direction = apiClient.cntroller.player.$post({ body: direction });
    console.log(ordered_direction);
  };

  //game_stateの変更(start|playing|stop)
  //game_stateをserverにpost req
  const change_game_state = async (change_count: number) => {
    const new_change_count: number = (change_count + 1) % 2;
    setchange_count(new_change_count);
    console.log('state', new_change_count);
    const changed_game_state = apiClient.cntroller.game_state.$post({ body: new_change_count });
    console.log(changed_game_state);
  };

  //発射命令をserverにpost req
  const order_to_shoot = async () => {
    //何も値をpostする必要がない場合の記述方法を調べる
    //応急処置
    apiClient.cntroller.laser_shot.$post({ body: [1] });
  };

  return (
    <div className={styles.container}>
      <div className={styles.up_down_button_board}>
        <div className={styles.up_button} onClick={() => order_to_direction('up')}>
          上
        </div>
        <div className={styles.down_button} onClick={() => order_to_direction('down')}>
          下
        </div>
      </div>
      <div className={styles.left_right_button_board}>
        <div className={styles.left_button} onClick={() => order_to_direction('left')}>
          左
        </div>
        <div className={styles.right_button} onClick={() => order_to_direction('right')}>
          右
        </div>
        <div className={styles.start_button} onClick={() => change_game_state(change_count)}>
          {game_state_list[change_count]}
        </div>
        <div className={styles.shoot_button} onClick={() => order_to_shoot()}>
          発射
        </div>
      </div>
    </div>
  );
};

export default Home;
