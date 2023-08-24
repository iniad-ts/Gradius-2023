import type { UserId } from 'commonTypesWithClient/branded';
import { useEffect, useRef, useState } from 'react';
import { Joystick } from 'react-joystick-component';
import type { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick';
import { apiClient } from 'src/utils/apiClient';
import { getUserIdFromLocalStorage } from 'src/utils/loginWithLocalStorage';
import styles from './index.module.css';

const Home = () => {
  const [windowsize, setWindowsize] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [moveIntervalId, setMoveIntervalId] = useState<NodeJS.Timeout | null>(null);
  const moveDirection = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [userId, setUserId] = useState<UserId>('' as UserId);

  const getUserId = async () => {
    const localStorageUserId = getUserIdFromLocalStorage();
    if (localStorageUserId === null) return;
    setUserId(localStorageUserId);
  };

  const shootBullet = async () => {
    if (userId === '') return;
    await apiClient.bullet.$post({ body: { userId } });
  };

  const handelMove = (e: IJoystickUpdateEvent) => {
    if (userId === '') {
      return;
    }
    const moveTo = {
      x: Math.round(e.x ?? 0),
      //canvasに合わせてy軸を反転させる
      y: Math.round((e.y ?? 0) * -1),
    };
    moveDirection.current = moveTo;
    if (moveIntervalId) {
      clearInterval(moveIntervalId);
    }
    apiClient.player.control.$post({ body: { MoveDirection: moveDirection.current, userId } });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getUserId();
    }, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowsize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.controller}>
      <div className={styles.joystick}>
        <Joystick
          size={Math.min(windowsize.width, windowsize.height) * 0.32}
          baseColor="#000000"
          stickColor="blue"
          move={handelMove}
        />
      </div>
      <button className={styles.button} onClick={shootBullet}>
        🚀
      </button>
    </div>
  );
};

export default Home;
