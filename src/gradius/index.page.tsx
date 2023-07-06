import { useAtom } from 'jotai';
import { userAtom } from 'src/atoms/user';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import styles from './gradius.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  if (!user) return <Loading visible />;
  return (
    <>
      <BasicHeader user={user} />(
      <div className={styles.container} />
      );
    </>
  );
};

export default Home;
