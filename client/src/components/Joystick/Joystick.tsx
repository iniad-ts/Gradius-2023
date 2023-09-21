import type { UserId } from 'commonTypesWithClient/branded';
import type { PointerEvent } from 'react';
import { useEffect, useRef } from 'react';
import type { Pos } from 'src/types/types';
import { apiClient } from 'src/utils/apiClient';
import styles from './Joystick.module.css';

type Props = {
  userId: UserId;
};

export const Joystick = ({ userId }: Props) => {
  const baseRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef<HTMLButtonElement>(null);

  let parentRect = new DOMRect();
  let isDrugging = false;
  let pointerId = 0;
  let moveIntervalIds: NodeJS.Timeout[] = [];
  let moveDirection: Pos = { x: 0, y: 0 };

  const relativePos = (absoluteX: number, absoluteY: number) => {
    if (baseRef.current === null) return { relativeX: 0, relativeY: 0 };

    const radius = baseRef.current.clientHeight / 2;
    const relativeX = absoluteX - parentRect.left - radius;
    const relativeY = absoluteY - parentRect.top - radius;

    const distance = Math.hypot(relativeX, relativeY);

    return distance <= radius
      ? { relativeX, relativeY }
      : {
          relativeX: (relativeX * radius) / distance,
          relativeY: (relativeY * radius) / distance,
        };
  };

  const updatePos = (e: PointerEvent<HTMLDivElement> | globalThis.PointerEvent) => {
    const { relativeX, relativeY } = relativePos(e.clientX, e.clientY);

    if (stickRef.current !== null) {
      stickRef.current.style.transform = `translate3d(${relativeX}px, ${relativeY}px, 0)`;
    }

    moveDirection = {
      x: relativeX / 200,
      y: relativeY / 200,
    };
  };

  const pointerMove = (e: globalThis.PointerEvent) => {
    if (!isDrugging || e.pointerId !== pointerId) return;
    e.preventDefault();

    updatePos(e);
  };

  const pointerUp = (e: globalThis.PointerEvent) => {
    if (e.pointerId !== pointerId) return;
    isDrugging = false;

    if (stickRef.current !== null) {
      stickRef.current.style.transform = 'translate3d(0, 0, 0)';
    }

    window.removeEventListener('pointerup', pointerUp);
    window.removeEventListener('pointercancel', pointerUp);
    window.removeEventListener('pointermove', pointerMove);

    moveDirection = { x: 0, y: 0 };
    moveIntervalIds.forEach(clearInterval);
    moveIntervalIds = [];
  };

  const pointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (stickRef.current === null || baseRef.current === null) return;

    isDrugging = true;
    pointerId = e.pointerId;

    parentRect = baseRef.current.getBoundingClientRect();

    window.addEventListener('pointerup', pointerUp);
    window.addEventListener('pointercancel', pointerUp);
    window.addEventListener('pointermove', pointerMove);

    updatePos(e);
    const moveIntervalId = setInterval(async () => {
      await apiClient.player.control.$post({
        body: {
          userId,
          MoveDirection: moveDirection,
        },
      });
    }, 20);
    moveIntervalIds.push(moveIntervalId);
  };

  useEffect(() => {
    const resize = () => {
      if (baseRef.current === null || stickRef.current === null) return;

      const vmin = Math.min(window.innerHeight, window.innerWidth);
      baseRef.current.style.width = `${vmin * 0.5}px`;
      stickRef.current.style.width = `${vmin * 0.3}px`;
    };
    resize();

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
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

  return (
    <div className={styles.container} onPointerDown={pointerDown}>
      <div ref={baseRef} className={styles.base}>
        <button ref={stickRef} className={styles.stick} />
      </div>
    </div>
  );
};
