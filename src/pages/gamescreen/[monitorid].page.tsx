import { useRouter } from 'next/router';
import Game from 'src/components/Game/Game';

const Home = () => {
  const router = useRouter();
  const { monitorid } = router.query;
  const monitoridNumber = Number(monitorid);

  return <Game monitorId={monitoridNumber} />;
};

export default Home;
