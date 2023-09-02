import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';

const Game = () => {
  const [displayNumber, setDisplayNumber] = useState<number>(0);
  const router = useRouter();

  const fetchDisplayNumber = useCallback(async () => {
    const res = await apiClient.config.$get();
    setDisplayNumber(res ?? 0);

    if (res === 0) {
      router.push('/config');
    }
  }, [router]);

  useEffect(() => {
    fetchDisplayNumber();
  }, [fetchDisplayNumber]);

  return (
    <div className={styles.container}>
      <div>
        <p className={styles.text}>ディスプレイの位置を選択してください</p>
        <div className={styles.buttons}>
          {[...Array(displayNumber)].map((_, i) => (
            <button key={i} onClick={() => router.push(`/game/${i}`)}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
