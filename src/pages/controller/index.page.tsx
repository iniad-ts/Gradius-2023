import { useAtom } from 'jotai';
import { userAtom } from 'src/atoms/user';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';
import styles from './controller.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  if (!user) return <Loading visible />;

  const isValidInput = (pushed: string): pushed is 'up' | 'left' | 'right' | 'down' | 'push' => {
    return ['up', 'left', 'right', 'down', 'push'].includes(pushed);
  };

  const pushButton = async (pushed: string) => {
    if (isValidInput(pushed)) {
      const input = pushed;
      const res = await apiClient.rooms.control.$post({ body: input });
      console.log(res);
    }
  };

  return (
    <>
      <div className={styles.container}>
        {/* 下記は簡易的に作ったモノです。削除してもらってかまいません */}
        {/* <h1 className={styles.word}>ここはcontrollerです</h1> */}
        <button onClick={() => pushButton('up')}>UP</button>
      </div>
    </>
  );
};

export default Home;
