import { useAtom } from 'jotai';
import { userAtom } from 'src/atoms/user';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';
import styles from './controller.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  if (!user) return <Loading visible />;

  const pushButton = async (pushed: string) => {
    const res = await apiClient.rooms.controller.$post({ body: pushed });
    console.log(res);
  };

  return (
    <>
      <div className={styles.container}>
        {/* 下記は簡易的に作ったモノです。削除してもらってかまいません */}
        <h1 className={styles.word}>ここはcontrollerです</h1>
        <button onClick={() => pushButton('up')}>kakiku</button>
        <button onClick={() => pushButton('push')}>sasisu</button>
      </div>
    </>
  );
};

export default Home;
