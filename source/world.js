import Box from './box';
import Tree from './tree';
import {
  randomIntInRange,
  randomBetween,
  seededRandomBetween,
  } from './util';

export default class Grid {

  constructor({r = 0, size = 100, game = {seed: ''}}){

    this.radius = r * size;
    this.x = r;
    this.y = r;
    this.size = size;
    this.grid = [];
    this.game = game;

    const PADDING = 20;

    for (let x = -this.x; x < this.x; x++) {
      for (let y = -this.y; y < this.y; y++) {
        this.grid[x] = this.grid[x] || [];

        if( Math.sqrt((x*size - size/2) * (x*size - size/2) + (y*size - size/2) * (y*size - size/2)) < r * size ) {
          this.grid[x][y] = new Tree({
            x: seededRandomBetween(`${x}:${x}:${y}`, this.game.seed, x * this.size + PADDING, (x+1) * this.size - PADDING),
            y: seededRandomBetween(`${y}:${x}:${y}`, this.game.seed, y * this.size + PADDING, (y+1) * this.size - PADDING),
            trunkRadius: seededRandomBetween(`${x}:${x}:${y}`, this.game.seed, 10, 20),
            leafRadius: seededRandomBetween(`${x}:${x}:${y}`, this.game.seed, 70, 150),
          });
        } else {
          this.grid[x][y] = null;
        }
      }
    }

  }

  inView(game, obj) {

    const { player, width, height } = game;

    return obj.x > player.x - height/2 - this.size &&
      obj.x < player.x + height/2 + this.size &&
      obj.y > player.y - height/2 - this.size&&
      obj.y < player.y + height/2 + this.size;

  }

  draw(game) {

    let drawCount = 0;

    for (let x = -this.x; x < this.x; x++) {
      for (let y = -this.y; y < this.y; y++) {
        const tree = this.grid[x][y];
        if(tree && this.inView(game, tree)){
          drawCount++;
          tree.draw(game);
        }
      }
    }

    game.debugger.add(`Trees: ${drawCount}`);

  }

}
