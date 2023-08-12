import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';

const Lobby = () => {
  const router = useRouter();
  const [displayNumber, setDisplayNumber] = useState<number>(0);

  useEffect(() => {
    const getDisplayNumber = async () => {
      // 非同期関数をuseEffectの中で定義
      const res = await apiClient.game.config.$get();
      if (res !== null) {
        setDisplayNumber(res);
      }
      if (res === 0) {
        router.push('/game/config');
      }
    };

    getDisplayNumber();
  }, [router]);

  return (
    <>
      {[...Array(displayNumber)].map((_, i) => (
        <button onClick={() => router.push({ query: { display: i } })} key={i}>
          {i}
        </button>
      ))}
    </>
  );
};

export default Lobby;
