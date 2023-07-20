import { useAtom } from 'jotai';
import { userAtom } from 'src/atoms/user';
import { Loading } from 'src/components/Loading/Loading';
import App from 'src/konva/konva';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';

const Home = () => {
  const [user] = useAtom(userAtom);
  if (!user) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <App />

      {/*f12で定義に飛んでください*/}
    </>
  );
};

export default Home;
