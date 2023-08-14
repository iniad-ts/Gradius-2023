import { useAtom } from 'jotai';
import { useRef, useState } from 'react';
import { userAtom } from '../../atoms/user';
import styles from './index.module.css';

const Controller = () => {
  const [user] = useAtom(userAtom);
  const [boxPosition, setBoxPosition] = useState('60%');
  const [circlePosition, setCirclePosition] = useState('15%');

  const joystickRef = useRef(null);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startPosition = useRef({ x: 0, y: 0 });

  const handleSwitchPositions = () => {
    setBoxPosition(boxPosition === '60%' ? '10%' : '60%');
    setCirclePosition(circlePosition === '15%' ? '70%' : '15%');
  };

  const handleJoystickTouchStart = (e) => {
    isDragging.current = true;
    const touch = e.targetTouches[0];
    const containerRect = containerRef.current.getBoundingClientRect();

    const centerX = containerRect.left + containerRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2;

    const initialX = touch.clientX - centerX;
    const initialY = touch.clientY - centerY;

    startPosition.current = {
      x: initialX,
      y: initialY,
    };
  };

  const handleJoystickTouchMove = (e) => {
    if (!isDragging.current) return;
    const touch = e.targetTouches[0];
    const containerRect = containerRef.current.getBoundingClientRect();

    const centerX = containerRect.left + containerRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2;

    const newJoystickX = touch.clientX - centerX - startPosition.current.x;
    const newJoystickY = touch.clientY - centerY - startPosition.current.y;

    const maxDistance = containerRect.width / 2 - joystickRef.current.offsetWidth / 2 - 50;
    const distanceSquared = newJoystickX * newJoystickX + newJoystickY * newJoystickY;

    if (distanceSquared <= maxDistance * maxDistance) {
      const clampedX = newJoystickX;
      const clampedY = newJoystickY;

      requestAnimationFrame(() => {
        joystickRef.current.style.transform = `translate(${clampedX}px, ${clampedY}px) translate(-50%, -50%)`;
      });
    } else {
      const angle = Math.atan2(newJoystickY, newJoystickX);
      const clampedX = maxDistance * Math.cos(angle);
      const clampedY = maxDistance * Math.sin(angle);

      requestAnimationFrame(() => {
        joystickRef.current.style.transform = `translate(${clampedX}px, ${clampedY}px) translate(-50%, -50%)`;
      });
    }
  };

  const handleJoystickTouchEnd = () => {
    joystickRef.current.style.transform = 'translate(-50%, -50%)';
  };

  return (
    <div style={{ position: 'relative' }}>
      <p>gradius controller</p>
      <div
        className={styles['box-container']}
        ref={containerRef}
        style={{ marginLeft: boxPosition }}
      >
        <div className={styles.box}>
          <div className={styles.arrow1} />
          <div className={styles.arrow2} />
          <div className={styles.arrow3} />
          <div className={styles.arrow4} />
          <div
            className={styles.joystick}
            ref={joystickRef}
            onTouchStart={handleJoystickTouchStart}
            onTouchMove={handleJoystickTouchMove}
            onTouchEnd={handleJoystickTouchEnd}
          />
        </div>
      </div>
      <button id="switch-button" className="switch-button" onClick={handleSwitchPositions}>
        Switch Positions
      </button>
      <div className={styles.circle} style={{ left: circlePosition }} />
    </div>
  );
};

export default Controller;
