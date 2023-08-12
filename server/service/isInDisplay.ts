export const isInDisplay = (displayNumber: number, positionX: number) =>
  !(1920 * displayNumber > positionX || positionX > 1920 * (displayNumber + 1));
