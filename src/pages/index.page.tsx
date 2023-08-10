import { useAtom } from 'jotai';
import Konva from 'konva';
import { useEffect, useState } from 'react';
import { Circle, Layer, Rect, Stage } from 'react-konva';
import { userAtom } from 'src/atoms/user';
import { Loading } from 'src/components/Loading/Loading';

const Home = () => {
  //黒い枠の中をクリックし、矢印ボタンを押すと、赤い点が動くよー
  const [playerX, setPlayerX] = useState(4);
  const [playerY, setPlayerY] = useState(0);
  const [tamaX, settamaX] = useState(0);
  const [tamaY, settamaY] = useState(2);
  const [user] = useAtom(userAtom);
  const [dx, setDx] = useState(-1); // x方向の移動量
  const dx2 = 1;
  const [dy, setDy] = useState(0); // y方向の移動量
  const [enemies, setEnemies] = useState<{ x: number; y: number }[]>([
    { x: 5, y: 2 },
    { x: 8, y: 4 },
  ]);
  const [bullet, setbullets] = useState<{ x: number; y: number }[]>([]);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const hoge = true;
  //キー入力
  const keydown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    // const game = await apiClient.?.$post({
    //   body: { ? },
    // });
  };

  //newgame作る
  const click = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // const newGame = await apiClient.create.$post();
  };

  //スペースで弾出すよ(打て打つほど早くなっちゃう)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        const newBullets = {
          x: playerY,
          y: playerX,
        };
        setbullets((prevbullets) => [...prevbullets, newBullets]);
        console.log(bullet);
        console.log(enemies);
        console.log(enemies.length);
        const tamaAnimation = new Konva.Animation((tama) => {
          setbullets((prevBullets) => {
            if (tama === undefined) {
              console.log('error');
              return prevBullets;
            } else {
              const speed = 2;
              const dist = speed * (tama.timeDiff / 1000);
              const newbullet = prevBullets.map((bullet) => ({
                ...bullet,
                x: bullet.x + dx2 * dist,
                y: bullet.y,
              }));
              return newbullet.filter((bullet) => bullet.x <= 18);
            }
          });
        });
        tamaAnimation.start();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dx2, dy]);

  const findnumber = (n: number) => {
    let count = 0;
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        // eslint-disable-next-line max-depth
        if (board[y][x] === n) {
          count++;
        }
      }
    }
    return count;
  };
  useEffect(() => {
    const moveenemy = () => {
      console.log('a');
      if (enemies.length === 0) {
        const addEnemy = () => {
          const newEnemies = [
            { x: 5, y: 2 },
            { x: 8, y: 4 },
          ];
          setEnemies((prevEnemies) => [...prevEnemies, ...newEnemies]);
        };
        addEnemy();
      }
      if (enemies.length !== 0) {
        console.log(enemies.length);
        const enemyAnimation = new Konva.Animation((enemy) => {
          setEnemies((prevenemy) => {
            if (enemy === undefined) {
              console.log('error');
              return prevenemy;
            } else {
              const speed = 0.1;
              const dist = speed * (enemy.timeDiff / 1000);
              const newenemy = prevenemy.map((enemies) => ({
                x: enemies.x + dx * dist,
                y: enemies.y,
              }));
              console.log();
              return newenemy.filter((enemy) => enemy.x >= 0);
            }
          });
        });
        enemyAnimation.start();
      }
    };
    moveenemy();

    return () => {
      moveenemy();
    };
  }, [dx, dy, enemies.length]);

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
      <Stage width={800} height={600}>
        <Layer>
          {board.map((row, y) =>
            row.map(
              (color, x) =>
                color !== 0 && (
                  <Rect
                    key={`${x}-${y}`}
                    x={x * 100 + 70}
                    y={y * 100}
                    width={100}
                    height={100}
                    fill="black"
                  />
                )
            )
          )}
          {enemies.map((enemy, index) => (
            <Circle key={index} x={enemy.x * 100} y={enemy.y * 100 + 50} radius={20} fill="green" />
          ))}
          {bullet.map((bullet, index) => (
            <Circle
              key={index}
              x={bullet.x * 100 + 50}
              y={bullet.y * 100 + 50}
              radius={20}
              fill="red"
            />
          ))}
        </Layer>
      </Stage>
    </>
  );
};

export default Home;
