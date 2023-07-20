import { useState } from 'react';
import { Layer, Line, Stage } from 'react-konva';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';

const Home = () => {
  //黒い枠の中をクリックし、矢印ボタンを押すと、赤い点が動くよー
  const [playerX, setPlayerX] = useState(5);
  const [playerY, setPlayerY] = useState(0);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [isFiring, setIsFiring] = useState(false);
  const [shotX, setShotX] = useState(0);
  const [shotY, setShotY] = useState(0);
  const fireShot = () => {
    if (!isFiring) {
      setShotX(playerX);
      setShotY(playerY);
      setIsFiring(true);

      const shotInterval = setInterval(() => {
        setShotX((preX) => preX + 5);
      }, 50);
      setTimeout(() => {
        clearInterval(shotInterval);
        setIsFiring(false);
      }, 300);
    }
  };
  const hoge = true;
  // const [displayShot, setDisplayShot] = useState(false);
  const keydown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(e);
    console.log(e.code);
    const game = await apiClient.game.$post({
      body: { x: playerX, y: playerY, key: e.code, board },
    });

    setPlayerX(game.x);
    setPlayerY(game.y);
    setBoard(game.board);
    if (e.code === 'KeyZ') {
      fireShot();
    }
    console.log(game.board);
  };

  const click = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log(e);
  };
  // const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
  //   const key = e.code;
  //   if (key === 'keyZ') {
  //     setShot(true);
  //   }
  // };

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
        <div id="key">shot:{isFiring ? 'Fired' : 'Not fired'}</div>
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
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} style={{ position: 'relative' }}>
              {color !== 0 && (
                <Stage width={40} height={40}>
                  <Layer>
                    <Line
                      x={0}
                      y={10}
                      points={[0, 0, 5, 5, 15, 5]}
                      closed
                      strokeWidth={1}
                      stroke="black"
                      fill="white"
                    />
                    <Line
                      x={5}
                      y={15}
                      points={[0, 0, 10, 0, 15, 2.5, 30, 2.5, 20, 7, 20, 5, 0, 5]}
                      strokeWidth={1}
                      closed
                      stroke="black"
                      fill="white"
                    />
                    <Line
                      x={5}
                      y={15}
                      points={[0, 0, 0, 5, -3, 5, -3, 0]}
                      strokeWidth={1}
                      closed
                      stroke="black"
                      fill="white"
                    />
                    <Line
                      x={5}
                      y={15}
                      points={[0, 0, 10, 0, 15, 2.5, 30, 2.5, 20, 7, 20, 5, 0, 5]}
                      strokeWidth={1}
                      closed
                      stroke="black"
                      fill="white"
                    />
                    <Line
                      x={5}
                      y={20}
                      points={[0, 0, 20, 0, 20, 2, 7, 4]}
                      strokeWidth={1}
                      closed
                      stroke="black"
                      fill="white"
                    />
                    <Line
                      x={15}
                      y={12}
                      points={[0, 0, 15, 5, 5, 5]}
                      closed
                      tension={0.5}
                      strokeWidth={1}
                      stroke="black"
                      fill="red"
                    />
                  </Layer>
                </Stage>
              )}
              {isFiring && color !== 0 && (
                <div
                  id="shot"
                  style={{
                    position: 'absolute',
                    left: `${shotX}px`,
                    top: `${shotY + 8}px`,
                    backgroundColor: 'blue',
                    width: '20px',
                    height: '10px',
                    borderRadius: '50%',
                  }}
                />
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Home;
