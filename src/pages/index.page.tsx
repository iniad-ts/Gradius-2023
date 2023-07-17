import { useAtom } from 'jotai';
import { Loading } from 'src/components/Loading/Loading';
import { userAtom } from '../atoms/user';
import { App } from './test/test';

const Home = () => {
  const [user] = useAtom(userAtom);

  if (!user) return <Loading visible />;

  return <></>;
};

export default Home;
