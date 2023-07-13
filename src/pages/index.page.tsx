import { useAtom } from 'jotai';
import { Loading } from 'src/components/Loading/Loading';
import { App } from 'src/test/test';
import { userAtom } from '../atoms/user';

const Home = () => {
  const [user] = useAtom(userAtom);

  if (!user) return <Loading visible />;

  return (
    <>
      <App />
    </>
  );
};

export default Home;
