import type { UserId } from 'commonTypesWithClient/branded';
import type { PlayerModel } from 'commonTypesWithClient/models';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Joystick } from 'react-joystick-component';
import type { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';
import { getUserIdFromLocalStorage } from 'src/utils/loginWithLocalStorage';
import styles from './index.module.css';

type MoveTo = {
  x: -1 | 0 | 1;
  y: -1 | 0 | 1;
};

const Home = () => {
  const [windowsize, setWindowsize] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [userId, setUserId] = useState<UserId>('' as UserId);
  const [playerStatus, setPlayerStatus] = useState<PlayerModel>();

  const [moveIntervalId, setMoveIntervalId] = useState<NodeJS.Timeout[]>([]);
  const moveDirection = useRef<MoveTo>({ x: 0, y: 0 });

  const [shootIntervalId, setShootIntervalId] = useState<NodeJS.Timeout[]>([]);

  const MOVE_INTERVAL_TIME = 20;
  const SHOOT_INTERVAL_TIME = 800;

  const getUserId = useCallback(async () => {
    const localStorageUserId = getUserIdFromLocalStorage();
    if (localStorageUserId === null) return;
    setUserId(localStorageUserId);
  }, []);

  const fetchPlayerStatus = useCallback(async () => {
    const res = await apiClient.player.control.$get({ query: { userId } });
    if (res === null) return;
    setPlayerStatus(res);
  }, [userId]);

  const startShoot = async () => {
    const shootInterbalId = setInterval(async () => {
      await apiClient.bullet.$post({
        body: {
          userId,
        },
      });
    }, SHOOT_INTERVAL_TIME);
    setShootIntervalId((prev) => [...prev, shootInterbalId]);
  };

  const stopShoot = () => {
    shootIntervalId.forEach((id) => clearInterval(id));
    setShootIntervalId([]);
  };
  const handelMove = (e: IJoystickUpdateEvent) => {
    moveDirection.current = {
      x: Math.round(e.x ?? 0) as -1 | 0 | 1,
      y: Math.round((e.y ?? 0) * -1) as -1 | 0 | 1,
    };
  };

  const startMove = () => {
    const moveInterbalId = setInterval(async () => {
      await apiClient.player.control.$post({
        body: {
          userId,
          MoveDirection: moveDirection.current,
        },
      });
    }, MOVE_INTERVAL_TIME);
    setMoveIntervalId((prev) => [...prev, moveInterbalId]);
  };

  const stopMove = () => {
    moveDirection.current = { x: 0, y: 0 };
    moveIntervalId.forEach((id) => clearInterval(id));
    setMoveIntervalId([]);
  };

  useEffect(() => {
    const userIdIntervalId = setInterval(() => {
      getUserId();
    }, 2000);

    const playerStatusIntervalId = setInterval(() => {
      fetchPlayerStatus();
    }, 5000);

    return () => {
      clearInterval(userIdIntervalId);
      clearInterval(playerStatusIntervalId);
    };
  }, [getUserId, fetchPlayerStatus]);

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

  if (userId === '') return <Loading visible />;

  return (
    <div className={styles.controller}>
      <div className={styles.joystick}>
        <Joystick
          size={Math.min(windowsize.width, windowsize.height) * 0.32}
          baseColor="#eee"
          stickColor="#d7d7d7"
          start={startMove}
          move={handelMove}
          stop={stopMove}
        />
      </div>
      <div>
        Score: {playerStatus?.score} <br />
      </div>
      <button
        className={styles.button}
        onTouchStart={startShoot}
        onTouchEnd={stopShoot}
        onTouchCancel={stopShoot}
        onMouseDown={startShoot}
        onMouseUp={stopShoot}
        onMouseLeave={stopShoot}
      >
        <div>🚀</div>
      </button>
    </div>
  );
};

export default Home;
