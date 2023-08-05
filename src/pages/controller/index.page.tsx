import type { MoveTo } from '$/useCase/playerUseCase';
import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { Joystick } from 'react-joystick-component';
import type { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick';
import { userAtom } from 'src/atoms/user';
import { Loading } from 'src/components/Loading/Loading';
import styles from './index.module.css';

const Controller = () => {
  const [shootIntervalId, setShootIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [moveIntervalId, setMoveIntervalId] = useState<NodeJS.Timeout | null>(null);
  const moveDirection = useRef<MoveTo>({ toX: 0, toY: 0 });
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [user] = useAtom(userAtom);

  const shootBullet = async () => {
    // await apiClient.bullet.$post();
    console.log('shoot');
  };

  const shootStart = () => {
    const intervalId = setInterval(shootBullet, 200);
    setShootIntervalId(intervalId);
  };

  const shootEnd = () => {
    if (shootIntervalId === null) return;
    clearInterval(shootIntervalId);
  };

  const move = async () => {
    // await apiClient.player.$post({ moveTo: moveDirection });
    console.log('move', moveDirection.current);
  };

  const moveStart = () => {
    const intervalId = setInterval(move, 50);
    setMoveIntervalId(intervalId);
  };

  const moveEnd = () => {
    if (moveIntervalId === null) return;
    clearInterval(moveIntervalId);
  };

  const handleMove = (e: IJoystickUpdateEvent) => {
    const moveTo = {
      toX: Math.round(e.x ?? 0),
      toY: Math.round(e.y ?? 0),
    };
    moveDirection.current = moveTo;
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!user) return <Loading visible />;

  return (
    <div className={styles.controller}>
      <div className={styles.joystick}>
        <Joystick
          baseColor="#eee"
          stickColor="#ddd"
          size={Math.min(windowSize.width, windowSize.height) * 0.32}
          move={handleMove}
          stop={moveEnd}
          start={moveStart}
        />
      </div>
      <div className={styles.information}>
        <p>
          HP
          <br />
          💛💛💛💛💛
        </p>
        <p>
          SCORE
          <br />
          314159265
        </p>
      </div>
      <button
        onTouchStart={shootStart}
        onTouchEnd={shootEnd}
        onTouchCancel={shootEnd}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
        className={styles['shoot-button']}
      >
        🚀
      </button>
    </div>
  );
};

export default Controller;
