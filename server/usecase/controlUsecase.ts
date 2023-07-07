/* eslint-disable complexity */
/* eslint-disable max-depth */
//自分の動きをコントロールする
export const controlUsecase = {
  key: (x: number, y: number, KeyEvent: string) => {
    if (KeyEvent === 'ArrowUp') {
      if (x === 0) {return {x,y}}
      console.log('ArrowUp')
      const newX = x-2;
      return {x:newX,y}
    }
    if (KeyEvent === 'ArrowDown') {
      console.log('ArrowDown')
      const newX = x+2;
      return {x:newX,y}
    }
    if (KeyEvent === 'ArrowLeft') {
      if (y === 0) {return {x,y}}
      console.log('ArrowLeft')
      const newY = y-2;
      return {x,y:newY}
    }
    if (KeyEvent === "ArrowRight") {
      console.log('ArrowRight')
      const newY = y+2;
      return {x,y:newY}
    }
    console.log(KeyEvent)
    return {x,y}
  },
};