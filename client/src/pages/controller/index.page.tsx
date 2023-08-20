import type { UserId } from 'commonTypesWithClient/branded';
import { useEffect, useRef, useState } from 'react';
import { Joystick } from 'react-joystick-component';
import type { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick';
import { apiClient } from 'src/utils/apiClient';
import { getUserIdFromLocalStorage } from 'src/utils/loginWithLocalStorage';
import styles from './controller.module.css';

const Home = () => {
  const [windowsize, setWindowsize] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [moveIntervalId, setMoveIntervalId] = useState<NodeJS.Timeout | null>(null);
  const moveDirection = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const shootBullet = async () => {
    console.log('shoot');
  };
  const [userId, setUserId] = useState<UserId | null>(null);

  const getPlayerId = async () => {
    const localStrageUserId = getUserIdFromLocalStorage();
    if (localStrageUserId === null) return;
    setUserId(localStrageUserId);
  };
  const move = (e: IJoystickUpdateEvent) => {
    if (userId === null) {
      return;
    }
    const moveTo = {
      x: Math.round(e.x ?? 0),
      y: Math.round(e.y ?? 0),
    };
    moveDirection.current = moveTo;
    if (moveIntervalId) {
      clearInterval(moveIntervalId);
    }
    apiClient.player.control.$post({ body: { MoveDirection: moveDirection.current, userId } });
  };
  useEffect(() => {
    getPlayerId();
  }, []);

  return (
    <div className={styles.controller}>
      <div className={styles.joystick}>
        <Joystick
          size={Math.min(windowsize.width, windowsize.height) * 0.1}
          baseColor="#000000"
          stickColor="blue"
          move={move}
        />
      </div>
      <button className={styles.button} onClick={shootBullet}>
        🚀
      </button>
    </div>
  );
};

export default Home;
