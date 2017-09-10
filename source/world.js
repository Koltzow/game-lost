import Box from './box';
import Tree from './tree';
import {
  randomIntInRange,
  randomBetween,
  seededRandomBetween,
  } from './util';

export default class Grid {

  constructor({x = 0, y = 0, size = 100, game = {seed: ''}}){

    this.x = x;
    this.y = y;
    this.size = size;
    this.grid = [];
    this.game = game;

    const PADDING = 20;

    for (let x = -this.x; x < this.x; x++) {
      for (let y = -this.y; y < this.y; y++) {
        this.grid[x] = this.grid[x] || [];
        this.grid[x][y] = new Tree({
          x: seededRandomBetween(`${x}:${x}:${y}`, this.game.seed, x * this.size + PADDING, (x+1) * this.size - PADDING),
          y: seededRandomBetween(`${y}:${x}:${y}`, this.game.seed, y * this.size + PADDING, (y+1) * this.size - PADDING),
          trunkRadius: seededRandomBetween(`${x}:${x}:${y}`, this.game.seed, 10, 20),
          leafRadius: seededRandomBetween(`${x}:${x}:${y}`, this.game.seed, 70, 150),
        });
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
        if(this.inView(game, tree)){
          drawCount++;
          tree.draw(game);
        }
      }
    }

    game.debugger.add(`Trees: ${drawCount}`);

  }

}
