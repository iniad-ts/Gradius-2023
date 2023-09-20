import { itemsData } from '$/commonConstantsWithClient/item';
export const itemDraw = () => {
  return itemsData[Math.floor(Math.random() * itemsData.length)];
};
