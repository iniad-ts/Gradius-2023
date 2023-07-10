//testCode//ここに書くのはyosuliです。

import { useState } from 'react';
import { apiClient } from 'src/utils/apiClient';

const Home = () => {
  const [hoge, setHoge] = useState(1);
  const onclick = async () => {
    await apiClient.gradius.post({ body: 'myPlane' });
    await apiClient.gradius.game.post({ body: 1 });
    await console.log((await apiClient.gradius.post({ body: 'myPlane' })).body);
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
