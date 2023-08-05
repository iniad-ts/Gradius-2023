import { useAtom } from 'jotai';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { userAtom } from '../../atoms/user';
import styles from './index.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);

  if (!user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles['handler-board']}>
        <button className={styles.handler}>上</button>
        <button className={styles.handler}>下</button>
        <button className={styles.handler}>左</button>
        <button className={styles.handler}>右</button>
      </div>
    </>
  );
};

export default Home;
