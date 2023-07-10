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
    const res = await apiClient.rooms.controller.$post({ body: 'up' });
    console.log(res);
  };

  const left = async () => {
    //左のボタンを押したら飛行機が左にka
  };

  const right = async () => {
    //右のボタンを押したら飛行機が右に
  };
  const down = async () => {
    const res = await apiClient.rooms.controller.$post({ body: 'down' });
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
            <div className={styles.switch} onClick={up} />
            <div />
            <div className={styles.switch} onClick={left} />
            <div className={styles.switch} />
            <div className={styles.switch} onClick={right} />
            <div />
            <div className={styles.switch} onClick={down} />
            <div />
          </div>
          {/* selectボタン */}
          <div className={styles.select}>select</div>
        </div>
      </div>
    </>
  );
};

export default Home;
