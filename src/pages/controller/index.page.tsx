import { useAtom } from 'jotai';
import { useState } from 'react';
import { userAtom } from '../../atoms/user';
import styles from './index.module.css';

const Controller = () => {
  const [user] = useAtom(userAtom);
  const [boxPosition, setBoxPosition] = useState('60%');
  const [circlePosition, setCirclePosition] = useState('15%'); // '110%'から'-50%'に変更

  const handleSwitchPositions = () => {
    setBoxPosition(boxPosition === '60%' ? '10%' : '60%');
    setCirclePosition(circlePosition === '15%' ? '70%' : '15%');
  };

  return (
    <div style={{ position: 'relative' }}>
      <p>gradius controller</p>
      <div className={styles['box-container']} style={{ marginLeft: boxPosition }}>
        <div className={styles.box} />
        <div className={styles.box} />
        <div className={styles.box} />
        <div className={styles.box} />
        <div className={styles.box} />
      </div>
      <button id="switch-button" onClick={handleSwitchPositions}>
        Switch Positions
      </button>
      <div className={styles.circle} style={{ left: circlePosition }} />
    </div>
  );
};

export default Controller;
