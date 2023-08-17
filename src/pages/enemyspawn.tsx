type SingleEnemy = {
  x: number;
  y: number;
  speedX: number;
  status: number;
};

const createBallEnemy = (): SingleEnemy => {
  const randomy = Math.floor(Math.random() * window.innerHeight);
  const randomx = Math.floor(Math.random() * window.innerWidth);
  return {
    x: randomx,
    y: randomy,
    speedX: -120,
    status: 0,
  };
};

const createSneakEnemy = (): SingleEnemy => {
  const randomy = Math.floor(Math.random() * window.innerHeight);
  const randomx = Math.floor(Math.random() * window.innerWidth);
  return {
    x: randomx,
    y: randomy,
    speedX: -110,
    status: 1,
  };
};

const createUpDownEnemy = (): SingleEnemy => {
  const randomy = Math.floor(Math.random() * window.innerHeight);
  const randomx = Math.floor(Math.random() * window.innerWidth);
  return {
    x: randomx,
    y: randomy,
    speedX: -150,
    status: 2,
  };
};
const spawnRandomTypeOfEnemy = (prevEnemy: SingleEnemy[]): SingleEnemy[] => {
  const enemyCreators = [createBallEnemy, createSneakEnemy, createUpDownEnemy];
  const randomCreator = enemyCreators[Math.floor(Math.random() * enemyCreators.length)];
  const newEnemy = randomCreator();

  return [...prevEnemy, newEnemy];
};

export { spawnRandomTypeOfEnemy };
