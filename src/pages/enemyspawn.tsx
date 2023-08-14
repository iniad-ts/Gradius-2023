type SingleEnemy = {
  x: number;
  y: number;
  speedX: number;
  status: number;
};

const createBallEnemy = (): SingleEnemy => {
  const randomy = Math.floor(Math.random() * (360 - 120 + 1)) + 120;
  return {
    x: 640,
    y: randomy,
    speedX: -120,
    status: 0,
  };
};

const createSneakEnemy = (): SingleEnemy => {
  const randomy = Math.floor(Math.random() * 241);
  return {
    x: 640,
    y: randomy,
    speedX: -110,
    status: 0,
  };
};

const createUpDownEnemy = (): SingleEnemy => {
  const randomy = Math.floor(Math.random() * 241);
  return {
    x: 640,
    y: randomy,
    speedX: -150,
    status: 0,
  };
};
const spawnRandomTypeOfEnemy = (prevEnemy: SingleEnemy[]): SingleEnemy[] => {
  const enemyCreators = [createBallEnemy, createSneakEnemy, createUpDownEnemy];
  const randomCreator = enemyCreators[Math.floor(Math.random() * enemyCreators.length)];
  const newEnemy = randomCreator();

  return [...prevEnemy, newEnemy];
};

export { spawnRandomTypeOfEnemy, createBallEnemy, createUpDownEnemy };
