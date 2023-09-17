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

const Bomb = ({ displayPosition, position }: Props) => {
  const imagePaths = [
    staticPath.images.Effect.boom.boom1_png,
    staticPath.images.Effect.boom.boom2_png,
    staticPath.images.Effect.boom.boom3_png,
    staticPath.images.Effect.boom.boom4_png,
    staticPath.images.Effect.boom.boom5_png,
    staticPath.images.Effect.boom.boom6_png,
  ];

  const [bombImage1] = useImage(imagePaths[0]);
  const [bombImage2] = useImage(imagePaths[1]);
  const [bombImage3] = useImage(imagePaths[2]);
  const [bombImage4] = useImage(imagePaths[3]);
  const [bombImage5] = useImage(imagePaths[4]);
  const [bombImage6] = useImage(imagePaths[5]);

  const bombImages = [bombImage1, bombImage2, bombImage3, bombImage4, bombImage5, bombImage6];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const relativePos = {
    x: position.x - displayPosition * SCREEN_WIDTH,
    y: position.y,
  };

  useEffect(() => {
    const updateBombImage = () => {
      if (currentImageIndex + 1 === bombImages.length) {
        clearInterval(intervalId);
        return;
      }
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    };

    const intervalId = setInterval(updateBombImage, 75);

    return () => {
      clearInterval(intervalId);
    };
  }, [bombImages.length, currentImageIndex]);

  return (
    <Image
      image={bombImages[currentImageIndex]}
      x={relativePos.x}
      y={relativePos.y}
      width={ENEMY_HALF_WIDTH * 1.8}
      height={ENEMY_HALF_WIDTH * 1.8}
    />
  );
};

export default Bomb;
