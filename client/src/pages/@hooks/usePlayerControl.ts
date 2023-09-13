import type { UserId } from 'commonTypesWithClient/branded';
import { useEffect, useRef, useState } from 'react';
import type { IJoystickUpdateEvent } from 'react-joystick-component/build/lib/Joystick';
import type { Pos } from 'src/types/types';
import { staticPath } from 'src/utils/$path';
import { apiClient } from 'src/utils/apiClient';

export const usePlayerControl = (userId: UserId) => {
  const [moveIntervalId, setMoveIntervalId] = useState<NodeJS.Timeout[]>([]);
  const moveDirection = useRef<Pos>({ x: 0, y: 0 });
  const [shootIntervalId, setShootIntervalId] = useState<NodeJS.Timeout[]>([]);
  const MOVE_INTERVAL_TIME = 20;
  const SHOOT_INTERVAL_TIME = 1000;
  const [isButtonActive, setButtonActive] = useState(false);
  const shootAudio = new Audio(staticPath.sounds.shot_mp3);
  const [shootBoolean, setShootBoolean] = useState(true);
  const shootBullet = async () => {
    if (shootBoolean) {
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
