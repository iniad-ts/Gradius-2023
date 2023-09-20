import type { UserId } from 'commonTypesWithClient/branded';
import { useRef, useState } from 'react';
import { staticPath } from 'src/utils/$path';
import { apiClient } from 'src/utils/apiClient';
import styles from './ShootButton.module.css';

type Props = {
  userId: UserId;
};

export const ShootButton = ({ userId }: Props) => {
  const [shootIntervalId, setShootIntervalId] = useState<NodeJS.Timeout[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const shootAudio = new Audio(staticPath.sounds.shoot_mp3);

  const vibration = (time: number) => {
    if (typeof window.navigator.vibrate === 'function') {
      navigator.vibrate(time);
    }
  };

  const startShoot = () => {
    const shoot = async () => {
      vibration(80);

      const audio = shootAudio.cloneNode() as HTMLAudioElement;
      audio.play();

      await apiClient.bullet.$post({
        body: { userId },
      });
    };

    shoot();
    const shootIntervalId = setInterval(shoot, 1000);
    setShootIntervalId((prev) => [...prev, shootIntervalId]);

    if (buttonRef.current !== null)
      buttonRef.current.className = `${styles.button} ${styles.buttonActive}`;
  };

  const stopShoot = () => {
    shootIntervalId.forEach((id) => clearInterval(id));
    setShootIntervalId([]);

    if (buttonRef.current !== null) buttonRef.current.className = styles.button;
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={startShoot}
        onTouchEndCapture={stopShoot}
        onTouchStart={startShoot}
        onTouchEnd={stopShoot}
        onTouchCancel={stopShoot}
        onMouseDown={startShoot}
        onMouseUp={stopShoot}
        onMouseLeave={stopShoot}
        ref={buttonRef}
      >
        <div>🚀</div>
      </button>
    </div>
  );
};
