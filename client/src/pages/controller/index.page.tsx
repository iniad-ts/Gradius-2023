import type { UserId } from 'commonTypesWithClient/branded';
import type { PlayerModel } from 'commonTypesWithClient/models';
import { useRouter } from 'next/router';
import type { MouseEvent, TouchEvent } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Joystick } from 'react-joystick-component';
import type { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick';
import GameClear from 'src/components/GameClear/GameClear';
import { apiClient } from 'src/utils/apiClient';
import { getUserIdFromLocalStorage, logoutWithLocalStorage } from 'src/utils/loginWithLocalStorage';
import styles from './index.module.css';

type MoveTo = {
  x: number;
  y: number;
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

  const router = useRouter();

  const MOVE_INTERVAL_TIME = 20;
  const SHOOT_INTERVAL_TIME = 50;

  const getUserId = useCallback(async () => {
    const localStorageUserId = getUserIdFromLocalStorage();
    if (!(playerStatus?.isPlaying ?? true)) return;
    if (localStorageUserId === null) {
      alert('ログインがまだ行われておりません');
      return router.push('/login');
    }
    setUserId(localStorageUserId);
  }, [router, playerStatus?.isPlaying]);

  const fetchPlayerStatus = useCallback(async () => {
    const res = await apiClient.player.control.$get({ query: { userId } });
    if (res === null) return;
    setPlayerStatus(res);
  }, [userId]);

  const startShoot = async (e: TouchEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLElement;
    const button = target.tagName === 'BUTTON' ? target : target.parentElement;
    button?.classList.add(styles.buttonActive);

    const shootIntervalId = setInterval(async () => {
      await apiClient.bullet.$post({
        body: {
          userId,
        },
      });
    }, SHOOT_INTERVAL_TIME);
    setShootIntervalId((prev) => [...prev, shootIntervalId]);
  };

  const stopShoot = (e: TouchEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLElement;
    const button = target.tagName === 'BUTTON' ? target : target.parentElement;
    button?.classList.remove(styles.buttonActive);

    shootIntervalId.forEach((id) => clearInterval(id));
    setShootIntervalId([]);
  };

  const handelMove = (e: IJoystickUpdateEvent) => {
    moveDirection.current = {
      x: e.x ?? 0,
      y: (e.y ?? 0) * -1,
    };
  };

  const startMove = () => {
    const moveIntervalId = setInterval(async () => {
      await apiClient.player.control.$post({
        body: {
          userId,
          MoveDirection: moveDirection.current,
        },
      });
    }, MOVE_INTERVAL_TIME);
    setMoveIntervalId((prev) => [...prev, moveIntervalId]);
  };

  const stopMove = () => {
    moveDirection.current = { x: 0, y: 0 };
    moveIntervalId.forEach((id) => clearInterval(id));
    setMoveIntervalId([]);
  };

  const joystickSize = useMemo(() => {
    const aspectRatio = windowsize.width / windowsize.height;
    if (aspectRatio > 3 / 4) {
      return Math.min(windowsize.height, windowsize.width) * 0.5;
    } else {
      return windowsize.width * 0.5 * 0.64;
    }
  }, [windowsize]);

  useEffect(() => {
    const userIdIntervalId = setInterval(() => {
      getUserId();
    }, 2000);

    const playerStatusIntervalId = setInterval(() => {
      fetchPlayerStatus();
    }, 500);

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
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.addEventListener(
      'touchstart',
      (e) => {
        e.preventDefault();
      },
      { passive: false }
    );
    document.body.addEventListener(
      'touchmove',
      (e) => {
        e.preventDefault();
      },
      { passive: false }
    );

    return () => {
      document.body.removeEventListener('touchstart', (e) => {
        e.preventDefault();
      });
      document.body.removeEventListener('touchmove', (e) => {
        e.preventDefault();
      });
    };
  }, []);

  if (!(playerStatus?.isPlaying ?? true)) return <GameClear />;

  return (
    <div className={styles.controller}>
      <div className={styles.joystick}>
        <Joystick
          size={joystickSize}
          baseColor="#eee"
          stickColor="#d7d7d7"
          start={startMove}
          move={handelMove}
          stop={stopMove}
        />
      </div>
      <div>
        スコア: {playerStatus?.score} <br />
        <button onClick={logoutWithLocalStorage}>logout</button>
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
