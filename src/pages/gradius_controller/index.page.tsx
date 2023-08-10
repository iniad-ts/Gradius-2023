import { useState } from 'react';
import styles from './index.module.css';

const Controller = () => {
  const [touchStartPosition, setTouchStartPosition] = useState({ x: 0, y: 0 });
  const [stickPosition, setStickPosition] = useState({ x: 0, y: 0 });
  const joystickLimit = 35;

  const handleTouchStart = (event: React.TouchEvent) => {
    const { clientX, clientY } = event.touches[0];
    setTouchStartPosition({ x: clientX, y: clientY });
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    const { clientX, clientY } = event.touches[0];
    const deltaX = clientX - touchStartPosition.x;
    const deltaY = clientY - touchStartPosition.y;

    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    if (distance <= joystickLimit) {
      setStickPosition({ x: deltaX, y: deltaY });
    } else {
      const angle = Math.atan2(deltaY, deltaX);
      const constrainedX = joystickLimit * Math.cos(angle);
      const constrainedY = joystickLimit * Math.sin(angle);
      setStickPosition({ x: constrainedX, y: constrainedY });
    }
  };

  const handleTouchEnd = () => {
    setStickPosition({ x: 0, y: 0 });
  };

  return (
    <div className={styles.base}>
      <div
        className={styles.joystick}
        id="joystick"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={styles.stick}
          id="joystick-ball"
          style={{ transform: `translate(${stickPosition.x}px, ${stickPosition.y}px)` }}
        />
      </div>
    </div>
  );
};

export default Controller;
