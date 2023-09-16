import { useRouter } from 'next/router';
import { DISPLAY_COUNT } from '../../../../server/commonConstantsWithClient';
import styles from './index.module.css';

const Game = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div>
        <p className={styles.text}>ディスプレイの位置を選択してください</p>
        <div className={styles.buttons}>
          {[...Array(DISPLAY_COUNT)].map((_, i) => (
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
