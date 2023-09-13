import { ENEMY_HALF_WIDTH, SCREEN_WIDTH } from 'commonConstantsWithClient';
import { useEffect, useState } from 'react';
import { Image } from 'react-konva';
import type { Pos } from 'src/types/types';
import { staticPath } from 'src/utils/$path';
import useImage from 'use-image';

type Props = {
  displayPosition: number;
  position: Pos;
};

const Boom = ({ displayPosition, position }: Props) => {
  const imagePaths = [
    staticPath.images.Effect.boom.boom1_png,
    staticPath.images.Effect.boom.boom2_png,
    staticPath.images.Effect.boom.boom3_png,
    staticPath.images.Effect.boom.boom4_png,
    staticPath.images.Effect.boom.boom5_png,
    staticPath.images.Effect.boom.boom6_png,
  ];

  const [boomImage1] = useImage(imagePaths[0]);
  const [boomImage2] = useImage(imagePaths[1]);
  const [boomImage3] = useImage(imagePaths[2]);
  const [boomImage4] = useImage(imagePaths[3]);
  const [boomImage5] = useImage(imagePaths[4]);
  const [boomImage6] = useImage(imagePaths[5]);

  const boomImages = [boomImage1, boomImage2, boomImage3, boomImage4, boomImage5, boomImage6];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const relativePos = {
    x: position.x - displayPosition * SCREEN_WIDTH,
    y: position.y,
  };

  useEffect(() => {
    const updateBoomImage = () => {
      if (currentImageIndex + 1 === boomImages.length) {
        clearInterval(intervalId);
        return;
      }
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    };

    const intervalId = setInterval(updateBoomImage, 75);

    return () => {
      clearInterval(intervalId);
    };
  }, [boomImages.length, currentImageIndex]);

  return (
    <Image
      image={boomImages[currentImageIndex]}
      x={relativePos.x}
      y={relativePos.y}
      width={ENEMY_HALF_WIDTH * 2 * 1.2}
      height={ENEMY_HALF_WIDTH * 2 * 1.2}
    />
  );
};

export default Boom;
