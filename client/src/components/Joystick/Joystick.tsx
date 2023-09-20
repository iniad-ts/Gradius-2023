import type { PointerEvent } from 'react';
import { useRef, useState } from 'react';
import styles from './Joystivk.module.css';

export type JoystickUpdateEvent = {
  type: 'move' | 'stop' | 'start';
  x: number | null;
  y: number | null;
  distance: number | null;
};

type JoystickProps = {
  size?: number;
  stickSize?: number;
  baseColor?: string;
  stickColor?: string;
  disabled?: boolean;
  move?: (event: JoystickUpdateEvent) => void;
  stop?: (event: JoystickUpdateEvent) => void;
  start?: (event: JoystickUpdateEvent) => void;
};

type JoystickCoordinates = {
  relativeX: number;
  relativeY: number;
  axisX: number;
  axisY: number;
  distance: number;
};

export const Joystick = ({
  size = 128,
  stickSize = size * 0.64,
  baseColor = '#eee',
  stickColor = '#d7d7d7',
  disabled = false,
  move,
  start,
  stop,
}: JoystickProps) => {
  const baseRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef<HTMLButtonElement>(null);
  const pointerId = useRef<number>();
  const parentRect = useRef<DOMRect>(new DOMRect());

  const [coordinates, setCoordinates] = useState<JoystickCoordinates>();

  const radius = size / 2;

  const relativePos = (absoluteX: number, absoluteY: number) => {
    const relativeX = absoluteX - parentRect.current?.left - radius;
    const relativeY = absoluteY - parentRect.current?.top - radius;

    const distance = Math.hypot(relativeX, relativeY);

    return distance <= radius
      ? { relativeX, relativeY, distance }
      : {
          relativeX: (relativeX * radius) / distance,
          relativeY: (relativeY * radius) / distance,
          distance,
        };
  };

  const updatePos = (e: PointerEvent<HTMLDivElement> | globalThis.PointerEvent) => {
    const { relativeX, relativeY, distance } = relativePos(e.clientX, e.clientY);

    setCoordinates({
      relativeX,
      relativeY,
      distance: Math.min((distance / (size / 2)) * 100),
      axisX: e.clientX - parentRect.current.left,
      axisY: e.clientY - parentRect.current.top,
    });

    if (move === undefined) return;

    move({
      type: 'move',
      x: (relativeX * 2) / size,
      y: (relativeY * 2) / size,
      distance,
    });
  };

  const pointerMove = (e: globalThis.PointerEvent) => {
    e.preventDefault();
    if (e.pointerId !== pointerId.current) return;

    updatePos(e);
  };

  const pointerUp = (e: globalThis.PointerEvent) => {
    if (e.pointerId !== pointerId.current) return;

    setCoordinates(undefined);

    window.removeEventListener('pointerup', pointerUp);
    window.removeEventListener('pointermove', pointerMove);

    pointerId.current = undefined;

    if (stop === undefined) return;

    stop({
      type: 'stop',
      x: null,
      y: null,
      distance: null,
    });
  };

  const pointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (disabled || stickRef.current === null) return;
    updatePos(e);

    parentRect.current = baseRef.current?.getBoundingClientRect() ?? parentRect.current;

    window.addEventListener('pointerup', pointerUp);
    window.addEventListener('pointermove', pointerMove);
    pointerId.current = e.pointerId;
    stickRef.current.setPointerCapture(e.pointerId);

    if (start !== undefined) {
      start({
        type: 'start',
        x: null,
        y: null,
        distance: null,
      });
    }
  };

  return (
    <div className={styles.container} onPointerDown={pointerDown}>
      <div
        ref={baseRef}
        className={styles.base}
        style={{
          width: size,
          height: size,
          backgroundColor: baseColor,
        }}
      >
        <button
          ref={stickRef}
          disabled={disabled}
          style={{
            width: stickSize,
            height: stickSize,
            backgroundColor: stickColor,
            transform: `translate3d(
              ${coordinates?.relativeX ?? 0}px,
              ${coordinates?.relativeY ?? 0}px,
              0
            )`,
          }}
          className={styles.stick}
        />
      </div>
    </div>
  );
};
