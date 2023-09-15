import { PLAYER_HALF_WIDTH, SCREEN_WIDTH } from 'commonConstantsWithClient';
import type { PlayerModel } from 'commonTypesWithClient/models';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Image } from 'react-konva';
import { staticPath } from 'src/utils/$path';
import useImage from 'use-image';

type Props = {
  displayPosition: number;
  player: PlayerModel;
  isDamaged: boolean;
};

export const Player = ({ displayPosition: displayNumber, player, isDamaged }: Props) => {
  const imageUrl =
    player.side === 'left'
      ? staticPath.images.entity.blue_spaceship_png
      : staticPath.images.entity.red_spaceship_png;
  const [playerImage] = useImage(imageUrl);

  const [opacity, setOpacity] = useState(1);
  const lastDamagedTime = useRef(0);

  useEffect(() => {
    if (isDamaged) {
      lastDamagedTime.current = performance.now();
    }

    const animationLoop = () => {
      const now = performance.now();
      if (now - lastDamagedTime.current < 1000) {
        const newOpacity = 0.5 + 0.5 * Math.sin((now - lastDamagedTime.current) / 50);
        setOpacity(newOpacity);
      } else {
        setOpacity(1);
      }

      requestAnimationFrame(animationLoop);
    };

    const cancelId = requestAnimationFrame(animationLoop);
    return () => {
      cancelAnimationFrame(cancelId);
    };
  }, [isDamaged]);

  const relativePos = useMemo(() => {
    return {
      x:
        player.pos.x -
        displayNumber * SCREEN_WIDTH +
        PLAYER_HALF_WIDTH * (player.side === 'left' ? 1 : -1),
      y: player.pos.y + PLAYER_HALF_WIDTH * (player.side === 'left' ? -1 : 1),
    };
  }, [displayNumber, player.pos.x, player.pos.y, player.side]);

  const rotation = useMemo(() => {
    return player.side === 'left' ? 90 : -90;
  }, [player.side]);

  return (
    <Image
      image={playerImage}
      width={PLAYER_HALF_WIDTH * 2}
      height={PLAYER_HALF_WIDTH * 2}
      x={relativePos.x}
      y={relativePos.y}
      rotation={rotation}
      opacity={opacity}
    />
  );
};
