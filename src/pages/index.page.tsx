import { useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';

const Home = () => {

  //黒い枠の中をクリックし、矢印ボタンを押すと、数字が増減する。
  const [playerX, setPlayerX] = useState(0);
  const [playerY, setPlayerY] = useState(0);
  const hoge = true;
  const keydown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(e);
    console.log(e.code);
    const game = await apiClient.game.$post({
      body: { x: playerX, y: playerY, key: e.code },
    });
    setPlayerX(game.x);
    setPlayerY(game.y);
  };

  const click = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log(e);
  };

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
