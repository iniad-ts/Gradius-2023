const MARGIN = 20;
export const isInDisplay = (displayNumber: number, positionX: number) =>
  !(1920 * displayNumber - MARGIN > positionX || positionX > 1920 * (displayNumber + 1) + MARGIN);
