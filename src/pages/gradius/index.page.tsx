import { useAtom } from 'jotai';
import { userAtom } from 'src/atoms/user';
import { Loading } from 'src/components/Loading/Loading';
import App from 'src/konva/konva';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import styles from './gradius.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  if (!user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.container}>
        <App />{/*f12で定義に飛んでください*/}
      </div>
    </>
  );
};

export default Home;
