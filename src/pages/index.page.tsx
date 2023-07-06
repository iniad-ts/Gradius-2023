import { useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';

const Home = () => {
  const [key, setKey] = useState('');
  // useEffect(() => {}, []);
  const hoge = true;
  const textarea = document.getElementById('input');

  const keydown = async (e: KeyboardEvent) => {
    const returnedKey = await apiClient.handler.$post({ body: { key: e.key } });
    setKey(returnedKey);
  };

  textarea?.addEventListener('keydown', keydown);

  if (!hoge) return <Loading visible />;

  return (
    <>
      <textarea placeholder="ここ" id="input" />
      <div id="key">Return{key}</div>
    </>
  );
};

export default Home;
