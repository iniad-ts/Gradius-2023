//testCode//ここに書くのはyosuliです。

import { useState } from 'react';
import { apiClient } from 'src/utils/apiClient';

const Home = () => {
  const [hoge, setHoge] = useState(1);
  const onclick = async () => {
    const newHoge = await apiClient.gradius.post();
    await apiClient.gradius.game.post({ body: 1 });
    console.log(hoge);
    setHoge(newHoge.body.game[0].xyz[1] % 2);
  };

  const onR = () => {
    document.getElementsByTagName('html')[0].oncontextmenu = function () {
      return false;
    };
    //
  };
  return (
    <div
      style={{ width: '100vw', height: '100vh', backgroundColor: hoge === -1 ? '#800' : '#088' }}
      onClick={() => onclick()}
      onContextMenu={() => onR()}
    />
  );
};

export default Home;
