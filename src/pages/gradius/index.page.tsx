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
  );
};

export default Home;
