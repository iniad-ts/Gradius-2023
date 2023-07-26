import type { PlayerStatus } from '$/repository/playersRepository';
import type { MoveTo } from '$/usecase/playerUseCase';
import { useCallback, useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from './controller.module.css';

const Controller = () => {
  const clickMoveButton = useCallback((moveTo: MoveTo) => {
    const res = apiClient.player.$post({ body: moveTo });
    console.log(res);
  }, []);
  const [playerStatus, setPlayerStatus] = useState<PlayerStatus>();
  const [upPush, setUpPush] = useState(false);
  const [downPush, setDownPush] = useState(false);
  const [leftPush, setLeftPush] = useState(false);
  const [rightPush, setRightPush] = useState(false);

  const clickShootButton = () => {
    const res = apiClient.bullet.$post();
    console.log(res);
  };

  const move = useCallback(() => {
    if (upPush) {
      clickMoveButton({ toX: 0, toY: -1 });
    }
    if (downPush) {
      clickMoveButton({ toX: 0, toY: 1 });
    }
    if (leftPush) {
      clickMoveButton({ toX: -1, toY: 0 });
    }
    if (rightPush) {
      clickMoveButton({ toX: 1, toY: 0 });
    }
  }, [clickMoveButton, upPush, downPush, leftPush, rightPush]);

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          setUpPush(true);
          break;
        case 'ArrowDown':
          setDownPush(true);
          break;
        case 'ArrowLeft':
          setLeftPush(true);
          break;
        case 'ArrowRight':
          setRightPush(true);
          break;
      }
    });
    window.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          setUpPush(false);
          break;
        case 'ArrowDown':
          setDownPush(false);
          break;
        case 'ArrowLeft':
          setLeftPush(false);
          break;
        case 'ArrowRight':
          setRightPush(false);
          break;
      }
    });
    move();
  }, [upPush, downPush, leftPush, rightPush, move]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const res = await apiClient.player.status.$get();
      if (res === null) return;
      setPlayerStatus({
        health: res.health,
        score: res.score,
      });
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.container}>
      <p>
        HP: {playerStatus?.health ?? 0} SCORE: {playerStatus?.score ?? 0}
      </p>
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
