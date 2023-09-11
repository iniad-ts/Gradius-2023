import { useEffect, useState } from 'react';
import styles from './traffic.module.css';

export const Traffic = ({
  traffic,
  width,
  length,
}: {
  traffic: number;
  width: number;
  length: number;
}) => {
  const [traffics, setTraffics] = useState([0]);
  const [update, setUpdate] = useState(true);
  useEffect(() => {
    if (update) setTraffics([...traffics.slice(-length + 1), traffic]);
  }, [setTraffics, traffic, traffics, update, length]);
  return (
    <div className={styles.container} style={{ width }}>
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
              width: `${Math.min(1, (traffic / 1.0) * 10 ** 4) * 100}%`,
              color: traffic > 1.0 * 10 ** 4 ? '#f00' : '#00f',
            }}
          >{`${String(traffic)}ms`}</div>
        </div>
      ))}
    </div>
  );
};
