import type { EventModel, GameModel } from '$/commonTypesWithClient/models';
import { useAtom } from 'jotai';
import Konva from 'konva';
import { useCallback, useEffect, useState } from 'react';
import { Circle, Layer, Rect, Stage } from 'react-konva';
import { userAtom } from 'src/atoms/user';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';

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
  const [hoge2, setHoge] = useState<{ games: GameModel[]; event: EventModel }>();
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

  //敵作る
  const generateEnemy = useCallback(() => {
    const newEnemy = {
      x: 14,
      y: Math.floor(Math.random() * 5),
    };

    setEnemies((prevEnemies) => [...prevEnemies, newEnemy]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //敵について
  useEffect(() => {
    const frame = new Konva.Animation((frame) => {
      setEnemies((prevEnemies) => {
        const speed = 2;
        if (frame === undefined) {
          console.log('error');
          return enemies;
        } else {
          const dist = speed * (frame.timeDiff / 1000);
          const newEnemies = prevEnemies.map((enemy) => ({
            ...enemy,
            x: enemy.x + dx * dist,
            y: enemy.y,
          }));
          return newEnemies.filter((enemy) => enemy.x >= 0);
        }
      });
    });

    frame.start();

    const interval = setInterval(() => {
      generateEnemy();
    }, 1200);

    return () => {
      frame.stop();
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dx, dy, generateEnemy]);

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

  //弾の衝突判定
  useEffect(() => {
    const updatedEnemies = enemies.filter((enemy) => {
      for (const bulletObj of bullet) {
        // eslint-disable-next-line max-depth
        if (Math.floor(enemy.x) === Math.floor(bulletObj.x) && enemy.y === bulletObj.y) {
          return false; // 一致したenemyは除外する
        }
      }
      return true; // 一致しなかったenemyは残す
    });
    setEnemies(updatedEnemies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bullet]);

  const onclick = async () => {
    await apiClient.gradius.game.post({ body: 1 });
    fetchGradius();
  };

  const onR = async () => {
    document.getElementsByTagName('html')[0].oncontextmenu = () => false;
    await apiClient.gradius.game.post({ body: 6 });
  };

  const fetchGradius = async () => {
    const newHoge = (await apiClient.gradius.post()).body;
    console.log(newHoge);
    setHoge(newHoge);
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
      {/* <div
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor:
            hoge2 === null || hoge2 === undefined
              ? '#080'
              : hoge2.games[0].xyz[1] % 2 === -1
              ? '#800'
              : '#088',
          textAlign: 'center',
        }}
        key={'a'}
        onClick={() => onclick()}
        onContextMenu={() => onR()}
      >
        {hoge2?.games[0].hp}
      </div> */}
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
