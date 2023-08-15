import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SettingIcon } from 'src/components/icons/SettingIcon';
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';

const Config = () => {
  const [display, setDisplay] = useState<string>('');

  const fetchDisplayNumber = async () => {
    const res = await apiClient.game.config.$get();
    if (res !== null) {
      setDisplay(String(res));
    }
  };

  useEffect(() => {
    const cancelId = requestAnimationFrame(() => {
      fetchDisplayNumber();
    });
    return () => cancelAnimationFrame(cancelId);
  }, []);

  const handleChangeDisplay = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const displayNumber = Math.min(Math.max(Number(e.target.value), 1), 99);
    if (!isNaN(displayNumber)) {
      setDisplay(String(e.target.value === '' ? '' : displayNumber));
      await apiClient.game.config.$post({ body: { displayNumber } });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.title}>
          <h1>Gradius</h1>
          <h2>Config</h2>
        </div>
        <div className={styles.config}>
          <label>ディスプレイ枚数</label>
          <input
            type="text"
            value={display}
            inputMode="numeric"
            onChange={handleChangeDisplay}
            min={1}
          />
        </div>
        <Link href="/game" className={styles.button}>
          ゲーム画面
          <span />
        </Link>
        <div className={styles['icon-right']}>
          <SettingIcon size={20} fill="currentColor" />
        </div>
        <div className={styles['icon-left']}>
          <SettingIcon size={20} fill="currentColor" />
        </div>
      </div>
    </div>
  );
};

export default Config;
