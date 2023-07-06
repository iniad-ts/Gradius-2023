import type { Player } from '$/Usecase/playerUsecase';
import { useState } from 'react';
import { Circle, Layer, Stage } from 'react-konva';
import { apiClient } from 'src/utils/apiClient';

export const App = () => {
  const [playerX, setPlayerX] = useState(0);
  const [playerY, setPlayerY] = useState(0);
  const fetchPlayer = async (player: Player) => {
    const playerdata = await apiClient.player.$post({ body: player });
    setPlayerX(playerdata.PlayerPos.x);
    setPlayerY(playerdata.PlayerPos.y);
  };
  return (
    // Stage - is a div wrapper
    // Layer - is an actual 2d canvas element, so you can have several layers inside the stage
    // Rect and Circle are not DOM elements. They are 2d shapes on canvas
    <>
      <Stage width={720} height={720}>
        <Layer>
          <Circle x={playerX} y={playerY} stroke="black" fill="black" radius={50} />
        </Layer>
      </Stage>
      <button
        onClick={() => {
          const player: Player = {
            PlayerPos: { x: playerX, y: playerY },
            MoveInput: 'down',
          };
          fetchPlayer(player);
          console.log(playerY);
        }}
      >
        down
      </button>
      <button
        onClick={() => {
          const player: Player = {
            PlayerPos: { x: playerX, y: playerY },
            MoveInput: 'up',
          };
          fetchPlayer(player);
          console.log(playerY);
        }}
      >
        up
      </button>
      <button
        onClick={() => {
          const player: Player = {
            PlayerPos: { x: playerX, y: playerY },
            MoveInput: 'left',
          };
          fetchPlayer(player);
          console.log(playerY);
        }}
      >
        left
      </button>
      <button
        onClick={() => {
          const player: Player = {
            PlayerPos: { x: playerX, y: playerY },
            MoveInput: 'right',
          };
          fetchPlayer(player);
          console.log(playerY);
        }}
      >
        right
      </button>
    </>
  );
};
