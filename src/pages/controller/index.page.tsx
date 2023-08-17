import type { MoveTo } from '$/usecase/controlUseCase';
import { apiClient } from 'src/utils/apiClient';
import styles from './controller.module.css';

const Controller = () => {
  const directions: MoveTo[] = [
    { toX: -1, toY: -1 },
    { toX: 0, toY: -1 },
    { toX: 1, toY: -1 },
    { toX: -1, toY: 0 },
    { toX: 1, toY: 0 },
    { toX: -1, toY: 1 },
    { toX: 0, toY: 1 },
    { toX: 1, toY: 1 },
  ];

  const clickButton = (moveTo: MoveTo) => {
    const res = apiClient.player.$post({ body: moveTo });
    console.log(res);
  };

  return (
    <div className={styles.container}>
      <div className={styles.controller}>
        <button onClick={() => clickButton(directions[0])}>↖</button>
        <button onClick={() => clickButton(directions[1])}>↑</button>
        <button onClick={() => clickButton(directions[2])}>↗</button>
        <button onClick={() => clickButton(directions[3])}>←</button>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>🤩</div>
        <button onClick={() => clickButton(directions[4])}>→</button>
        <button onClick={() => clickButton(directions[5])}>↙</button>
        <button onClick={() => clickButton(directions[6])}>↓</button>
        <button onClick={() => clickButton(directions[7])}>↘</button>
      </div>
    </div>
  );
};
export default Controller;
