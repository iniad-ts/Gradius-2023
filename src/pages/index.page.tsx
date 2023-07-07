import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';
import { userAtom } from '../atoms/user';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [nowkey, setNowkey] = useState([0, 0]);
  const [enemyY, setEnemyY] = useState(300);

  const keyDownHandler = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    const a = await apiClient.control.post({ body: { x: nowkey[0], y: nowkey[1], KeyEvent:e.code } });
    setNowkey([a.body.x, a.body.y]);
  }

  const updateEnemyY = async () => {
    const state = await apiClient.enemy.post({ body: { y: enemyY } });
    const got = Number(state.body.y);
    if (got !== enemyY) {
      setEnemyY(got);
    }
  };
  
  useEffect(() => {
    const cancelid = setInterval(updateEnemyY, 50);
  
    return () => {
      clearInterval(cancelid);
    };
  }, [enemyY]);

  
  
  

  if (!user) return <Loading visible />;
  return (
    <>
      <p>gradius{nowkey}</p>
      <div
        tabIndex={0}
        onKeyDown={keyDownHandler}
        style={{ display: 'inline-block', border: 'solid'}}
      >
        <Stage width={1280} height={720}>
          <Layer>
            <Rect x={nowkey[1]} y={nowkey[0]} width={50} height={40} fill="blue" />
            <Rect x={1100} y={enemyY} width={50} height={40} fill="red" />
          </Layer>
        </Stage>
      </div>
    </>
  );
  
};

export default Home;
