import { useState } from 'react';

// eslint-disable-next-line react-hooks/rules-of-hooks

export const createTask1 = async (label: number): Promise<number> => {
  console.log(label)
  return label;
};
