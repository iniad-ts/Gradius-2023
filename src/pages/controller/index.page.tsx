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
    const res = await apiClient.rooms.boardcontroller.$post({ body: '1' });
    console.log(res);
  };

  const down = async () => {
    const res = await apiClient.rooms.boardcontroller.$post({ body: '2' });
    console.log(res);
  };
  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.container}>
        <div className={styles.board}>
          <div className={styles.items}>
            <div />
            <div className={styles.switch} onClick={up} />
            <div />
            <div className={styles.switch} />
            <div className={styles.switch} />
            <div className={styles.switch} />
            <div />
            <div className={styles.switch} onClick={down} />
            <div />
          </div>
          <div className={styles.select}>select</div>
        </div>
      </div>
    </>
  );
};

export default Home;
