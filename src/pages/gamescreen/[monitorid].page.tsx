import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { userAtom } from 'src/atoms/user';
import Game from 'src/components/Game/Game';

const Home = () => {
  const [user] = useAtom(userAtom);
  const router = useRouter();
  const monitoridNumber = Number(router.query);

  return <Game monitorId={monitoridNumber} />;
};

export default Home;
