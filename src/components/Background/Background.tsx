import { Rect } from 'react-konva';

export const Background = () => {
  return (
    <>
      <Rect fill="#555" height={1080} width={1920} />
      {[...Array(200)].map((_, i) => (
        <Rect
          key={i}
          fill="#999"
          height={Math.random() * 2 + 2}
          width={Math.random() * 2 + 2}
          x={Math.random() * 1920}
          y={Math.random() * 1080}
        />
      ))}
    </>
  );
};
