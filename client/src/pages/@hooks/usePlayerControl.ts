import type { UserId } from 'commonTypesWithClient/branded';
import { useEffect, useRef, useState } from 'react';
import type { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick';
import type { Pos } from 'src/types/types';
import { staticPath } from 'src/utils/$path';
import { apiClient } from 'src/utils/apiClient';

const MOVE_INTERVAL_TIME = 20;
const SHOOT_INTERVAL_TIME = 1000;

export const usePlayerControl = (userId: UserId) => {
  const [moveIntervalId, setMoveIntervalId] = useState<NodeJS.Timeout[]>([]);
  const moveDirection = useRef<Pos>({ x: 0, y: 0 });

  const [shootIntervalId, setShootIntervalId] = useState<NodeJS.Timeout[]>([]);
  const shootAudio = new Audio(staticPath.sounds.shot_mp3);
  const [shootBoolean, setShootBoolean] = useState(true);
  const [isButtonActive, setButtonActive] = useState(false);
  //振動させる関数
  const vibration = (time: number) => {
    if (typeof window.navigator.vibrate === 'function') {
      navigator.vibrate(time);
    }
  };
  const shootBullet = async () => {
    if (shootBoolean) {
      vibration(80);

      const audio = shootAudio.cloneNode() as HTMLAudioElement;
      audio.play();

      await apiClient.bullet.$post({
        body: {
          userId,
        },
      });
      setShootBoolean(false);
    }
  };

  const startShoot = async () => {
    setButtonActive(true);

    const shootIntervalId = setInterval(async () => {
      vibration(80);

      const audio = shootAudio.cloneNode() as HTMLAudioElement;
      audio.play();

      await apiClient.bullet.$post({
        body: {
          userId,
        },
      });
    }, SHOOT_INTERVAL_TIME);

    setShootIntervalId((prev) => [...prev, shootIntervalId]);
  };

  const stopShoot = () => {
    setButtonActive(false);
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

  useEffect(() => {
    const bulletInterval = setInterval(() => {
      setShootBoolean(true);
    }, SHOOT_INTERVAL_TIME);
    return () => {
      clearInterval(bulletInterval);
    };
  }, [shootBoolean]);

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

  return {
    startMove,
    stopMove,
    startShoot,
    stopShoot,
    handelMove,
    shootBullet,
    isButtonActive,
  };
};
