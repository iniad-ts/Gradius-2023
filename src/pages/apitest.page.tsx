import { useAtom } from 'jotai';
import { Loading } from 'src/components/Loading/Loading';
import { userAtom } from '../atoms/user';

const Home = () => {
  const [user] = useAtom(userAtom);
  if (!user) return <Loading visible />;

  return (
    <>
      <div>
        <h2>Gamesession</h2>
        <button>セッション作る</button>
        <button>データ持ってくる</button>
        <button>スコア加算</button>
      </div>
      <div>
        <h2>Player</h2>
        <button>ゲーム開始</button>
        <button>ゲーム終了</button>
      </div>
    </>
  );
};

export default Home;
