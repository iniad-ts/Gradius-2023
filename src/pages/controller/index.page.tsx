import { useAtom } from 'jotai';
import { userAtom } from 'src/atoms/user';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import styles from './controller.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  if (!user) return <Loading visible />;

  const up = async () => {
    const a = 1;
    const res = await apiClient.rooms.boardcontroller.$post({ body: { a } });
    console.log(res);
  };

  const down = async () => {
    const a = 2;
    const res = await apiClient.rooms.boardcontroller.$post({ body: { a } });
    console.log(res);
  };
  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.container}>
        <div className={styles.button} onClick={up}>
          上ボタン
        </div>
        <div className={styles.button} onClick={down}>
          下ボタン
        </div>
      </div>
    </>
  );
};

export default Home;
