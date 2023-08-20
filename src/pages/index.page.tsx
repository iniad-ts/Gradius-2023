import { useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';

const Home = () => {
  const [playerX, setPlayerX] = useState(0);
  const [playerY, setPlayerY] = useState(0);
  // useEffect(() => {}, []);
  const hoge = true;

  const keydown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(e);
    console.log(e.code);
    const playerPos = await apiClient.handler.$post({
      body: { x: playerX, y: playerY, key: e.code },
    });
    setPlayerX(playerPos.x);
    setPlayerY(playerPos.y);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchPos();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!hoge) return <Loading visible />;

  return (
    <>
      <div
        className="container"
        onKeyDown={keydown}
        style={{ border: 'solid' }}
        onClick={click}
        tabIndex={0}
      >
        <div id="key">X:{playerX}</div>
        <div id="key">Y:{playerY}</div>
        <div id="key" />
      </div>
      <div
        id="player"
        style={{
          position: 'absolute',
          left: `${playerX}px`,
          top: `${playerY}px`,
          backgroundColor: 'red',
          width: '10px',
          height: '10px',
        }}
      />
    </>
  );
};

export default Home;
