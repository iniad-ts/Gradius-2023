//testCode//ここに書くのはyosuliです。

import type { EventModel, GameModel } from '$/commonTypesWithClient/models';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';

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
  );
};

export default Home;
