import { randomBetween } from './util';

export default class Tree {

  constructor(x = 0, y = 0, trunkRadius = 20, leafRadius = 100) {

    this.x = x;
    this.y = y;
    this.trunkRadius = trunkRadius;
    this.leafRadius = leafRadius;
    this.amplitude = 0.5;
    this.detail = 20;
    this.points = Array(this.detail).fill().map((i) => {
      return randomBetween(1-this.amplitude, 1);
    });

  }

  update(game) {}

  draw(game) {

    // draw trunk
    game.context.fillStyle = '#111';
    game.context.beginPath();
    game.context.arc(
      this.x,
      this.y,
      this.trunkRadius,
      0,
      2*Math.PI
    );
    game.context.fill();

    // draw top
    game.context.fillStyle = 'rgba(0, 0, 0, 0.5)';
    game.context.beginPath();
    this.points.forEach((p, i) => {
      game.context.lineTo(
        this.x + Math.cos(Math.PI*2/this.points.length*(i+1)) * p * this.leafRadius + (Math.sin(game.frame/30 + p + this.x)*p) * 5,
        this.y + Math.sin(Math.PI*2/this.points.length*(i+1)) * p * this.leafRadius + (Math.sin(game.frame/30 + p + this.y)*p) * 3
      );
    });
    game.context.fill();

  }

}
