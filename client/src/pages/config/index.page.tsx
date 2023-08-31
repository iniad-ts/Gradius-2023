import type { ChangeEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';

const Config = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [value, setValue] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setValue(Number(target.value));
  };

  const fetchConfig = async () => {
    const res = await apiClient.config.$get();
    if (res === null) return;

    setValue(res);
  };

  const saveConfig = async () => {
    await apiClient.config.$post({
      body: {
        displayNumber: value,
      },
    });
  };

  const isDisabled = useMemo(() => {
    return [value === 0, value > 16].some(Boolean);
  }, [value]);

  useEffect(() => {
    const rotation = (e: MouseEvent) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const x = (windowWidth / 2 - e.clientX) / 50;
      const y = (windowHeight / 2 - e.clientY) / 50;
      setRotate({ x, y });
    };

    window.addEventListener('mousemove', rotation);
    return () => {
      window.removeEventListener('mousemove', rotation);
    };
  }, []);

  useEffect(() => {
    fetchConfig();
  });

  return (
    <div className={styles.container}>
      <div
        className={styles.card}
        style={{ transform: `rotateX(${rotate.y}deg) rotateY(${rotate.x * -1}deg)` }}
      >
        <h1 className={styles.title}>Config</h1>
        <div className={styles.input}>
          <label htmlFor="display">ディスプレイ枚数</label>
          <input type="number" id="display" onChange={handleChange} value={value} />
        </div>
        <div className={styles.button}>
          <button disabled={isDisabled} onClick={saveConfig}>
            保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default Config;
