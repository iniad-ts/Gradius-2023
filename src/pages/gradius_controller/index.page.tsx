import { useEffect, useRef, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import styles from './index.module.css';

const Controller = () => {
  const joystickLimitNumber = 35;
  const joystickBallRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const setupJoystick = () => {
    if (joystickBallRef.current) {
      const joystickBall = joystickBallRef.current;
      const joystickCenterX =
        joystickBall.getBoundingClientRect().left + joystickBall.clientWidth / 2;
      const joystickCenterY =
        joystickBall.getBoundingClientRect().top + joystickBall.clientHeight / 2;
      return { joystickBall, joystickCenterX, joystickCenterY };
    }
    return null;
  };

  useEffect(() => {
    const setupResult = setupJoystick();
    if (setupResult) {
      const { joystickBall, joystickCenterX, joystickCenterY } = setupResult;

      const handleTouchMove = (event: TouchEvent) => {
        event.preventDefault();
        const touch = event.touches[0];
        const pageX = touch.pageX;
        const pageY = touch.pageY;

        const touchX =
          Math.abs(pageX - joystickCenterX) < joystickLimitNumber
            ? pageX - joystickCenterX
            : pageX - joystickCenterX > 0
            ? joystickLimitNumber
            : -joystickLimitNumber;
        const touchY =
          Math.abs(pageY - joystickCenterY) < joystickLimitNumber
            ? pageY - joystickCenterY
            : pageY - joystickCenterY > 0
            ? joystickLimitNumber
            : -joystickLimitNumber;

        joystickBall.style.left = `calc(50% + ${touchX}px)`;
        joystickBall.style.top = `calc(50% + ${touchY}px)`;
      };

      const handleTouchEnd = () => {
        joystickBall.style.top = '50%';
        joystickBall.style.left = '50%';
      };

      joystickBall.addEventListener('touchmove', handleTouchMove);
      joystickBall.addEventListener('touchend', handleTouchEnd);

      return () => {
        joystickBall.removeEventListener('touchmove', handleTouchMove);
        joystickBall.removeEventListener('touchend', handleTouchEnd);
      };
    }
  });

  const getJoystickMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;
    setPosition({ x, y });
  };

  window.addEventListener('resize', () => {
    const setupResult = setupJoystick();
    if (setupResult && joystickBallRef.current) {
      const { joystickCenterX, joystickCenterY } = setupResult;
      joystickBallRef.current.style.left = `calc(50% + ${joystickCenterX}px)`;
      joystickBallRef.current.style.top = `calc(50% + ${joystickCenterY}px)`;
    }
  });

  if (!joystickBallRef.current) return <Loading visible />;
  return (
    <div className={styles.joystick} id="joystick">
      <div className={styles.joystickFrame} id="joystick-frame" onTouchMove={getJoystickMove}>
        <div
          className={styles.joystickBall}
          id="joystick-ball"
          ref={joystickBallRef}
          style={{ left: position.x, top: position.y }}
        />
      </div>
    </div>
  );
};

export default Controller;
