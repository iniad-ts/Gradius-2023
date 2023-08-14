import type { EnemyTableModel } from '$/commonTypesWithClient/models';
import { gamesRepository } from '$/repository/gamesRepository';

const firstTable = [
  { createPosition: { x: 1140, y: 60 }, type: 1 },
  { createPosition: { x: 1620, y: 300 }, type: 1 },
  { createPosition: { x: 540, y: 420 }, type: 1 },
  { createPosition: { x: 1020, y: 540 }, type: 2 },
  { createPosition: { x: 540, y: 660 }, type: 1 },
  { createPosition: { x: 1620, y: 780 }, type: 1 },
  { createPosition: { x: 1140, y: 1020 }, type: 1 },
];

const middleTable = [
  { createPosition: { x: 420, y: 60 }, type: 1 },
  { createPosition: { x: 1740, y: 60 }, type: 1 },
  { createPosition: { x: 60, y: 300 }, type: 1 },
  { createPosition: { x: 420, y: 300 }, type: 2 },
  { createPosition: { x: 1380, y: 300 }, type: 1 },
  { createPosition: { x: 1740, y: 300 }, type: 2 },
  { createPosition: { x: 420, y: 540 }, type: 1 },
  { createPosition: { x: 1020, y: 540 }, type: 1 },
  { createPosition: { x: 1740, y: 540 }, type: 1 },
  { createPosition: { x: 1260, y: 660 }, type: 1 },
  { createPosition: { x: 660, y: 780 }, type: 1 },
  { createPosition: { x: 1020, y: 780 }, type: 2 },
  { createPosition: { x: 1260, y: 900 }, type: 1 },
  { createPosition: { x: 1020, y: 1020 }, type: 1 },
];

const finalTable = [
  { createPosition: { x: 1380, y: 60 }, type: 1 },
  { createPosition: { x: 1020, y: 180 }, type: 1 },
  { createPosition: { x: 1740, y: 180 }, type: 2 },
  { createPosition: { x: 540, y: 300 }, type: 1 },
  { createPosition: { x: 1380, y: 300 }, type: 1 },
  { createPosition: { x: 780, y: 420 }, type: 1 },
  { createPosition: { x: 1620, y: 420 }, type: 3 },
  { createPosition: { x: 180, y: 540 }, type: 1 },
  { createPosition: { x: 420, y: 540 }, type: 2 },
  { createPosition: { x: 1140, y: 540 }, type: 2 },
  { createPosition: { x: 780, y: 660 }, type: 1 },
  { createPosition: { x: 1620, y: 660 }, type: 3 },
  { createPosition: { x: 540, y: 780 }, type: 1 },
  { createPosition: { x: 1380, y: 780 }, type: 1 },
  { createPosition: { x: 1020, y: 900 }, type: 1 },
  { createPosition: { x: 1740, y: 900 }, type: 2 },
  { createPosition: { x: 1380, y: 1020 }, type: 1 },
];

const reversYWithI = (y: number, i: number) => (i % 2 === 0 ? y : 1080 - y);

export const enemyTable = async (): Promise<EnemyTableModel[][] | null> => {
  const displayNumber = (await gamesRepository.find())?.displayNumber;
  if (displayNumber === undefined) return null;
  if (displayNumber === 1) return [finalTable];
  if (displayNumber === 2) return [finalTable, finalTable];
  const middle = [...Array(displayNumber - 2)].map((_, i) =>
    middleTable.map((table) => ({
      ...table,
      createPosition: { ...table.createPosition, y: reversYWithI(table.createPosition.y, i) },
    }))
  );
  return [firstTable, ...middle, finalTable];
};
