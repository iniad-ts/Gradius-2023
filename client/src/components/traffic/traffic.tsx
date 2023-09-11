import { useCallback, useEffect, useState } from 'react';
import styles from './traffic.module.css';

const MAX = 1000;

export const Traffic = ({
  traffic,
  left,
  length,
  text,
}: {
  traffic: number | undefined;
  left: number;
  length: number;
  text: string;
}) => {
  const [traffics, setTraffics] = useState([0]);
  const [update, setUpdate] = useState(true);

  const updateTraffic = useCallback(() => {
    if (traffic !== undefined) setTraffics((prev) => [...prev.slice(-length + 1), traffic]);
  }, [traffic, length]);
  useEffect(() => {
    if (update) updateTraffic();
  }, [update, updateTraffic]);
  return (
    <div
      className={styles.container}
      style={{ left, gridTemplateRows: `repeat(${traffics.length + 2}, 1fr)` }}
    >
      <p>{text}</p>
      <div
        className={styles.stop}
        style={{ backgroundColor: update ? '#f0f' : '#0f0' }}
        onClick={() => setUpdate(!update)}
      >
        stop
      </div>
      {traffics.map((traffic, index) => (
        <div className={styles.trafficRow} key={index}>
          <div
            className={styles.traffic}
            style={{
              width: `${Math.min(1, Math.max(0, traffic) / MAX) * 100}%`,
              backgroundColor: traffic > MAX ? '#f00' : '#00f',
            }}
          />
          <p>{`${String(traffic).split('').slice(0, 5).join('')}ms`}</p>
        </div>
      ))}
    </div>
  );
};
