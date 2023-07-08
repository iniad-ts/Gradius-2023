//ここにコントローラー画面を作る

import { useAtom } from 'jotai';
import { userAtom } from 'src/atoms/user';
import { Loading } from 'src/components/Loading/Loading';
import styles from './gradius_controller.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  if (!user) return <Loading visible />;
  const order_to_up = async () => {
    const up_of_degree = 1;
    console.log('up', up_of_degree);
  };
  const order_to_down = async () => {
    const down_of_degree = 1;
    console.log('down', down_of_degree);
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
