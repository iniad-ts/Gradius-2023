import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from './Lobby.module.css';

const Lobby = () => {
  const router = useRouter();
  const [displayNumber, setDisplayNumber] = useState(0);

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
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Gradius</h1>
        <h2>Config</h2>
      </div>
      <div className={styles.buttons}>
        {[...Array(displayNumber)].map((_, i) => (
          <button
            className={styles.button}
            onClick={() => router.push({ query: { display: i } })}
            key={i}
          >
            {i}
          </button>
        ))}
      </div>
      <p className={styles.text}>画面を選択してください</p>
    </div>
  );
};

export default Lobby;
