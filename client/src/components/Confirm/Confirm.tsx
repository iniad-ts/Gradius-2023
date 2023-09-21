import type { Dispatch, SetStateAction } from 'react';
import { staticPath } from 'src/utils/$path';
import styles from './Confirm.module.css';

type Props = {
  confirm: Dispatch<SetStateAction<boolean>>;
};

export const Confirm = ({ confirm }: Props) => {
  const clickButton = () => {
    confirm(true);
    document.documentElement.requestFullscreen();
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <p className={styles.text}>
          このゲームでは
          <ruby>
            音<rp>(</rp>
            <rt>おと</rt>
            <rp>)</rp>
          </ruby>
          が
          <ruby>
            出<rp>(</rp>
            <rt>で</rt>
            <rp>)</rp>
          </ruby>
          るよ！
        </p>
        <div className={styles.image}>
          <img src={staticPath.icons.icon_volume_png} alt="スピーカーのアイコン" />
        </div>
      </div>
      <div className={styles.card}>
        <p className={styles.text}>
          <ruby>
            横<rp>(</rp>
            <rt>よこ</rt>
            <rp>)</rp>画面<rp>(</rp>
            <rt>がめん</rt>
            <rp>)</rp>
          </ruby>
          でプレイしてね！
        </p>
        <div className={styles.image}>
          <img src={staticPath.icons.icon_rotate_png} alt="横画面のアイコン" />
        </div>
      </div>
      <div className={styles.card}>
        <p className={styles.text}>
          <ruby>
            全<rp>(</rp>
            <rt>ぜん</rt>
            <rp>)</rp>画面<rp>(</rp>
            <rt>がめん</rt>
            <rp>)</rp>
          </ruby>
          になるよ！
        </p>
        <div className={styles.image}>
          <img src={staticPath.icons.icon_fullscreen_png} alt="全画面のアイコン" />
        </div>
      </div>
      <button className={styles.confirm} onClick={clickButton}>
        わかった
      </button>
    </div>
  );
};
