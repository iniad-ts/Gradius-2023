import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';

const Home = () => {
  const [playerX, setPlayerX] = useState(0);
  const [playerY, setPlayerY] = useState(0);
  // useEffect(() => {}, []);
  const hoge = true;

  const fetchPos = async () => {
    const res = await apiClient.handler.$get();
    setPlayerX(playerX + res.x);
    setPlayerY(playerY + res.y);
    console.log('fetchPos');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchPos();
    }, 10);
    return () => clearInterval(interval);
  }, []);

  if (!hoge) return <Loading visible />;

  return (
    <>
      <div className="container">
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
