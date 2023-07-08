//testCode//ここに書くのはyosuuliです。

import { useState } from 'react';
import { apiClient } from 'src/utils/apiClient';

const Home = () => {
  const [hoge, setHoge] = useState(1);
  const onclick = async () => {
    await apiClient.gradius.event.post({ body: { name: 'myPlane', level: 1 } });
    await apiClient.gradius.post({ body: 1 });
    await console.log(await apiClient.gradius.event.game.post({ body: 'myPlane' }));
    setHoge(3 - hoge);
  };
  return (
    <div
      style={{ width: '100vw', height: '100vh', backgroundColor: hoge === 1 ? '#800' : '#088' }}
      onClick={() => onclick()}
    />
  );
};

export default Home;
