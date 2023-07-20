import { useState } from 'react';
import { Layer, Line, Stage } from 'react-konva';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';
const Home = () => {
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
    e.preventDefault();
    const game = await apiClient.game.$post({
      body: { x: playerX, y: playerY, key: e.code, board },
    });
    console.log(game.x);
    console.log(game.y);
    setPlayerX(game.x);
    setPlayerY(game.y);
    setBoard(game.board);
  };
  const click = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    await apiClient.create.$post();
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
      <div className={styles.board}>
        {board.map((row, y) =>
          // eslint-disable-next-line complexity
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
            </div>
          ))
        )}
      </div>
    </>
  );
};

// Rectで書いたものをメモ用に残してます(すぐ消します)
/*<Rect
stroke="black"
fill="white"
strokeWidth={1}
x={0}
y={10}
width={20}
height={10}
/>*/
export default Home;
