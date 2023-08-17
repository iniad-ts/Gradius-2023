<<<<<<< HEAD
<<<<<<< HEAD
//testCode//ここに書くのはyosuliです。

import type { GameModel, UserEventModel } from '$/commonTypesWithClient/models';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';

const Home = () => {
  const [hoge, setHoge] = useState<{ games: GameModel[]; event: UserEventModel }>();
  const [objects, setObjects] = useState<GameModel[]>();
  const [time, setTime] = useState(new Date().getTime());
  const fetchGradius = async () => {
    const newHoge = (await apiClient.gradius.post()).body;
    const newObjects = await (await apiClient.gradius.get()).body;
    setHoge(newHoge);
    setObjects(newObjects);
    setTime(new Date().getTime());
  };
  useEffect(() => {
    const cancelId = setInterval(fetchGradius, 1000);
    console.table(objects?.map((object) => [object.id, ...object.xyz]));
    return () => {
      clearInterval(cancelId);
    };
  });
  const onclick = async () => {
    await apiClient.gradius.game.post({ body: 4 });
    fetchGradius();
  };

  const onR = async () => {
    document.getElementsByTagName('html')[0].oncontextmenu = () => false;
    await apiClient.gradius.game.post({ body: 6 });
  };
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: hoge === null || hoge === undefined ? '#080' : '#088',
        textAlign: 'center',
        position: 'relative',
      }}
      key={'a'}
      onClick={() => onclick()}
      onContextMenu={() => onR()}
    >
      <>{hoge?.games[0].hp}</>
      {objects?.map((object) => (
        <div
          style={{
            position: 'absolute',
            width: 50,
            height: 50,
            backgroundColor: '#000',
            left: object.xyz[0] + (time - object.created) * 0.01 * object.vector[0],
            top: object.xyz[1],
          }}
          key={`${object.id}`}
        />
      ))}
    </div>
=======
import { useAtom } from 'jotai';
import Konva from 'konva';
import { useCallback, useEffect, useState } from 'react';
import { Circle, Layer, Rect, Stage } from 'react-konva';
import { userAtom } from 'src/atoms/user';
import { Loading } from 'src/components/Loading/Loading';
=======
//testCode//ここに書くのはyosuliです。

import type { EventModel, GameModel } from '$/commonTypesWithClient/models';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';

>>>>>>> parent of ab96eed (フロント)
const Home = () => {
  const [hoge, setHoge] = useState<{ games: GameModel[]; event: EventModel }>();

  const fetchGradius = async () => {
    const newHoge = (await apiClient.gradius.post()).body;
    console.log(newHoge);
    setHoge(newHoge);
  };
  useEffect(() => {
    const cancelId = setInterval(fetchGradius, 1000);
    return () => {
      clearInterval(cancelId);
    };
  });
  const onclick = async () => {
    await apiClient.gradius.game.post({ body: 1 });
    fetchGradius();
  };

  const onR = async () => {
    document.getElementsByTagName('html')[0].oncontextmenu = () => false;
    await apiClient.gradius.game.post({ body: 6 });
  };
  return (
<<<<<<< HEAD
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
>>>>>>> parent of 67edd52 (修正)
=======
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor:
          hoge === null || hoge === undefined
            ? '#080'
            : hoge.games[0].xyz[1] % 2 === -1
            ? '#800'
            : '#088',
        textAlign: 'center',
      }}
      key={'a'}
      onClick={() => onclick()}
      onContextMenu={() => onR()}
    >
      {hoge?.games[0].hp}
    </div>
>>>>>>> parent of ab96eed (フロント)
  );
};

export default Home;
