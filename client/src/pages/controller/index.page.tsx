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
  const [remainingTime, setRemainingTime] = useState<number>(0);

  //今は仮置きで500msの定数にしているが、アイテムとかで変動させるのもありかも
  const INTERVAL_TIME = 500;

  const getUserId = async () => {
    const localStorageUserId = getUserIdFromLocalStorage();
    if (localStorageUserId === null) return;
    setUserId(localStorageUserId);
  };

  const shootBullet = async () => {
    if (userId === '' || remainingTime > 0) return;
    setRemainingTime(INTERVAL_TIME);

    await apiClient.bullet.$post({ body: { userId } });
    setTimeout(() => {
      setRemainingTime(0);
    }, INTERVAL_TIME);
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
    const remainingTimeIntervalId = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime((prev) => prev - 100);
      }
    }, 100);
    return () => {
      clearInterval(intervalId);
      clearInterval(remainingTimeIntervalId);
    };
  }, [remainingTime]);

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
      <button
        className={styles.button}
        onClick={shootBullet}
        style={{ opacity: 1 - remainingTime / INTERVAL_TIME }}
      >
        🚀
      </button>
    </div>
  );
};

export default Home;
