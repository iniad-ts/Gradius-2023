import { useAtom } from 'jotai';
import { userAtom } from 'src/atoms/user';
import { Loading } from 'src/components/Loading/Loading';
import styles from './gamescreen.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  if (!user) return <Loading visible />;

  return (
    <>
      <div className={styles.container}>{/*  */}</div>
    </>
  );
};

export default Home;
