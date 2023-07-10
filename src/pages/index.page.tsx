import { useState } from 'react';
import { Layer, Line, Rect, Stage } from 'react-konva';
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
  const hoge = true;
  const keydown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(e);
    console.log(e.code);
    const game = await apiClient.game.$post({
      body: { x: playerX, y: playerY, key: e.code, board },
    });

    setPlayerX(game.x);
    setPlayerY(game.y);
    setBoard(game.board);
    console.log(game.board);
  };

  const click = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log(e);
  };
  //ここまで

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
      <div className={styles.board}>
        {board.map((row, y) =>
          // eslint-disable-next-line complexity
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} style={{ position: 'relative' }}>
              {color !== 0 && (
                <Stage width={40} height={40}>
                  <Layer>
                    <Rect fill="red" x={0} y={10} width={20} height={10} />
                    <Line points={[20, 10, 20, 20, 40, 15, 20, 10]} stroke="white" fill="white" />
                  </Layer>
                </Stage>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Home;
