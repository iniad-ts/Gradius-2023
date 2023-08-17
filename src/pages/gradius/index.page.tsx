//testCode//ここに書くのはyosuliです。

import type { GameModel, UserEventModel } from '$/commonTypesWithClient/models';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';

const Home = () => {
  const [hoge, setHoge] = useState<{ games: GameModel[]; event: UserEventModel }>();
  const [objects, setObjects] = useState<GameModel[]>();
  const fetchGradius = async () => {
    const newHoge = (await apiClient.gradius.post()).body;
    const newObjects = (await apiClient.gradius.get()).body;
    setHoge(newHoge);
    setObjects(newObjects);
  };
  useEffect(() => {
    const cancelId = setInterval(fetchGradius, 1000);
    console.table(objects?.map((object) => [object.id, ...object.xyz]));
    return () => {
      clearInterval(cancelId);
    };
  });
  const onclick = async () => {
    await apiClient.gradius.input.post({ body: 4 });
    fetchGradius();
  };

  const onR = async () => {
    document.getElementsByTagName('html')[0].oncontextmenu = () => false;
    await apiClient.gradius.input.post({ body: 6 });
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
      onClick={() => onclick()}
      onContextMenu={() => onR()}
    >
      <>{hoge?.games[0].hp}</>
      {objects?.map((object) => {
        // const xyz = moveObject(object, time);
        return (
          <div
            style={{
              position: 'absolute',
              width: 50,
              height: 50,
              backgroundColor: '#000',
              left: object.xyz[0],
              top: object.xyz[1],
            }}
            key={`${object.id}`}
          />
        );
      })}
    </div>
  );
};

export default Home;
