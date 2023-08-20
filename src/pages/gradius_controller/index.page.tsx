//ここにコントローラー画面を作る

import { useAtom } from 'jotai';
import { userAtom } from 'src/atoms/user';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';
import styles from './gradius_controller.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [change_count, setchange_count] = useState(0);
  const game_state_list: string[] = ['wait_start', 'playing', 'stop'];
  if (!user) return <Loading visible />;

  if (!user) return <Loading visible />;
  const order_to_up = async () => {
    const res = apiClient.cntroller.$post({ body: 'up' });
    console.log(res);
  };
  const order_to_down = async () => {
    const res = apiClient.cntroller.$post({ body: 'down' });
    console.log(res);
  };

  return (
    <div className={styles.container}>
      <div className={styles.up_button} onClick={order_to_up}>
        上
      </div>
      <div className={styles.down_button} onClick={order_to_down}>
        下
      </div>
    </div>
  );
};

export default Home;
