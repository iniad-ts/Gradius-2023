import type { PlayerModel } from 'commonTypesWithClient/models';
import type { NextRouter } from 'next/router';
import { useMemo, useState } from 'react';
import styles from './index.module.css';

type props = {
  player: PlayerModel;
  displayDuration: number;
  router: NextRouter;
};

export const DisplayYourSide = ({ player, displayDuration, router }: props) => {
  const [display, setDisplay] = useState<'left' | 'right'>();

  const displayShip = useMemo((): ('left' | 'right')[] => {
    if (displayDuration < 2000) return [player.side];
    return ['left', 'right'];
  }, [displayDuration, player.side]);

  return (
    <div className={styles.titleCard}>
      <h1 className={styles.title}>Gradius</h1>
      <p
        className={styles.announcement}
        style={{
          gridRow: '3 ',
        }}
      >
        あなたは
      </p>
      <div className={styles.roulette}>
        {displayShip.includes('right') && <div className={styles.redPlayer} />}
        {displayShip.includes('left') && <div className={styles.bluePlayer} />}
      </div>
      <p
        className={styles.announcement}
        style={{
          gridRow: '9',
        }}
      >
        ※ どちらも おなじ むずかしさ
      </p>

      <button className={styles.button} onClick={() => router.push('/controller')}>
        プレイ
      </button>
    </div>
  );
};
