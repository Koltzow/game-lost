import { randomBetween } from './util';

export default class Tree {

  constructor(x = 0, y = 0) {

    this.x = x;
    this.y = y;
    this.radius = 20;
    this.points = Array(6).fill().map((i) => {
      return randomBetween(0.5, 1);
    });

    console.log(this.points);

  }

  update(game) {
    return true;
  }

  draw(game) {

    // draw trunk
    game.context.fillStyle = '#111';
    game.context.beginPath();
    game.context.arc(
      this.x,
      this.y,
      this.radius,
      0,
      2*Math.PI
    );
    game.context.fill();

    // draw top
    game.context.fillStyle = 'rgba(0, 0, 0, 0.5)';
    game.context.beginPath();
    this.points.forEach((p, i) => {
      game.context.lineTo(
        this.x + Math.cos(Math.PI/3*(i+1)) * p * 100,
        this.y + Math.sin(Math.PI/3*(i+1)) * p * 100
      );
    });
    game.context.fill();

  }

}
