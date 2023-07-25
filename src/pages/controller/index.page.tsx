import type { MoveTo } from '$/usecase/playerUseCase';
import { useCallback, useEffect } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from './controller.module.css';

const Controller = () => {
  const clickMoveButton = useCallback((moveTo: MoveTo) => {
    const res = apiClient.player.$post({ body: moveTo });
    console.log(res);
  }, []);

  const clickShootButton = () => {
    const res = apiClient.bullet.$post();
    console.log(res);
  };

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          clickMoveButton({ toX: 0, toY: -1 });
          break;
        case 'ArrowDown':
          clickMoveButton({ toX: 0, toY: 1 });
          break;
        case 'ArrowLeft':
          clickMoveButton({ toX: -1, toY: 0 });
          break;
        case 'ArrowRight':
          clickMoveButton({ toX: 1, toY: 0 });
          break;
      }
    });
  }, [clickMoveButton]);

  return (
    <div className={styles.container}>
      <div className={styles.controller}>
        <button onClick={() => clickMoveButton({ toX: -1, toY: -1 })}>↖</button>
        <button onClick={() => clickMoveButton({ toX: 0, toY: -1 })}>↑</button>
        <button onClick={() => clickMoveButton({ toX: 1, toY: -1 })}>↗</button>
        <button onClick={() => clickMoveButton({ toX: -1, toY: 0 })}>←</button>
        <button onClick={() => clickShootButton()}>🤩</button>
        <button onClick={() => clickMoveButton({ toX: 1, toY: 0 })}>→</button>
        <button onClick={() => clickMoveButton({ toX: -1, toY: 1 })}>↙</button>
        <button onClick={() => clickMoveButton({ toX: 0, toY: 1 })}>↓</button>
        <button onClick={() => clickMoveButton({ toX: 1, toY: 1 })}>↘</button>
      </div>
    </div>
  );
};
export default Controller;
