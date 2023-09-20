import { DISPLAY_COUNT, SCREEN_HEIGHT, SCREEN_WIDTH } from 'commonConstantsWithClient';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Image, Layer, Stage, Text } from 'react-konva';
import Bomb from 'src/components/Effect/Bomb';
import Burner from 'src/components/Effect/Burner';

import { FreedomMeteor } from 'src/components/Effect/FreedomMeteor';
import { Meteor } from 'src/components/Effect/Meteor';
import { Star } from 'src/components/Effect/Star';
import { Bullet } from 'src/components/Entity/Bullet';
import { Enemy } from 'src/components/Entity/Enemy';
import { Player } from 'src/components/Entity/Player';
import { useDisplay } from 'src/pages/@hooks/useDisplay';
import { useWindowSize } from 'src/pages/@hooks/useWindowSize';
import { staticPath } from 'src/utils/$path';
import useImage from 'use-image';
import styles from './index.module.css';

const Game = () => {
  const router = useRouter();
  let displayPosition: number | null = null;
  if (typeof router.query.displayPosition === 'string') {
    const parsed = Number(router.query.displayPosition);
    if (!isNaN(parsed)) {
      displayPosition = parsed;
    }
  }

  const [backgroundImage] = useImage(staticPath.images.space_background_8bit_jpg);

  const { bullets, players, enemies, BombEffectPosition, damagedPlayerIds } = useDisplay({
    displayPosition,
  });

  const nowTime = Date.now();

  const { width, height } = useWindowSize();

  useEffect(() => {
    const redirectToLobby = async () => {
      if (Number(displayPosition) >= DISPLAY_COUNT) {
        router.push('/game');
      }
    };
    redirectToLobby();
  }, [router, displayPosition]);

  //ANCHOR - return
  return (
    <div className={styles.canvasContainer}>
      <Stage
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        style={{
          transform: `
              scale(${width / SCREEN_WIDTH}, ${height / SCREEN_HEIGHT})
              translateX(${(width - SCREEN_WIDTH) / 2}px)
              translateY(${(height - SCREEN_HEIGHT) / 2}px)
              `,
        }}
      >
        <Layer>
          <Image
            image={backgroundImage}
            width={SCREEN_WIDTH}
            height={SCREEN_HEIGHT}
            x={0}
            y={0}
            opacity={0.8}
          />
        </Layer>
        <Layer>
          <Meteor displayPosition={displayPosition ?? 0} nowTime={nowTime} />
        </Layer>
        <Layer>
          <FreedomMeteor />
        </Layer>
        <Layer>
          {[...Array(5)].map((_, i) => (
            <Star nowTime={nowTime} key={i} />
          ))}
        </Layer>
        <Layer>
          {bullets.map((bullet) => (
            <Bullet
              displayPosition={displayPosition ?? 0}
              bullet={bullet}
              key={bullet.id}
              nowTime={nowTime}
            />
          ))}
        </Layer>
        <Layer>
          {players.map((player) => (
            <React.Fragment key={player.id}>
              <Text
                x={player.pos.x - SCREEN_WIDTH * (displayPosition ?? 0)}
                y={player.pos.y - 80}
                text={player.name.slice(0, 8)}
                fontSize={30}
                fill={'white'}
              />
              <Player
                displayPosition={displayPosition ?? 0}
                player={player}
                isDamaged={damagedPlayerIds.has(player.id)}
              />
              {player.speed >= 10 && (
                <Burner
                  displayPosition={displayPosition ?? 0}
                  position={player.pos}
                  side={player.side}
                />
              )}
            </React.Fragment>
          ))}
        </Layer>
        <Layer>
          {enemies.map((enemy) => (
            <Enemy displayPosition={displayPosition ?? 0} enemy={enemy} key={enemy.id} />
          ))}
        </Layer>
        <Layer>
          {BombEffectPosition.flat().map((position, index) => (
            <Bomb displayPosition={displayPosition ?? 0} position={position} key={index} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Game;
