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
    const res = await apiClient.rooms.controller2.$post({ body: 'up' });
    console.log(res);
  };

  const left = async () => {
    const res = await apiClient.rooms.controller2.$post({ body: 'left' });
    console.log(res);
  };

  const right = async () => {
    const res = await apiClient.rooms.controller2.$post({ body: 'right' });
    console.log(res);
  };
  const down = async () => {
    const res = await apiClient.rooms.controller2.$post({ body: 'down' });
    console.log(res);
  };
  const push = async () => {
    const res = await apiClient.rooms.push.$post({ body: 'push' });
    console.log(res);
  };

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.container}>
        <div className={styles.board}>
          {/* 十字キー */}
          <div className={styles.items}>
            <div />
            <div className={`${styles.switch} ${styles.up}`} onClick={up}>
              <div className={styles.upArrow} />
            </div>
            <div />
            <div className={`${styles.switch} ${styles.left}`} onClick={left}>
              <div className={styles.leftArrow} />
            </div>
            <div className={styles.switch}>
              <div className={styles.center} />
            </div>
            <div className={`${styles.switch} ${styles.right}`} onClick={right}>
              <div className={styles.rightArrow} />
            </div>
            <div />
            <div className={`${styles.switch} ${styles.down}`} onClick={down}>
              <div className={styles.downArrow} />
            </div>
            <div />
          </div>
          {/* selectボタン */}
          <div className={styles.select}>select</div>
          <div className={styles.select} onClick={push}>
            push
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
