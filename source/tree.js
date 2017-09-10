import { randomBetween, rad } from './util';

export default class Tree {

  constructor({x = 0, y = 0, trunkRadius = 20, leafRadius = 100}) {

    this.x = x;
    this.y = y;
    this.radius = trunkRadius;
    this.leafRadius = leafRadius;
    this.amplitude = 0;
    this.detail = 10;
    this.points = Array(this.detail).fill().map((i) => {
      return randomBetween(1-this.amplitude, 1);
    });

  }

  update(game) {}

  draw(game) {


    // draw trunk
    game.context.fillStyle = 'black';
    game.context.beginPath();
    game.context.arc(
      this.x,
      this.y,
      this.radius,
      0,
      2*Math.PI
    );
    game.context.fill();

    // draw shadow
    const rad0 = rad(game.player.x, game.player.y, this.x, this.y);
    let x1 = this.x + this.radius * Math.cos(rad0 - Math.PI/2 );
    let y1 = this.y + this.radius * Math.sin(rad0 - Math.PI/2 );
    let x2 = this.x + this.radius * Math.cos(rad0 + Math.PI/2 );
    let y2 = this.y + this.radius * Math.sin(rad0 + Math.PI/2 );
    const rad1 = rad(x2, y2, game.player.x, game.player.y);
    let x3 = x2 + Math.cos(rad1) * 500;
    let y3 = y2 + Math.sin(rad1) * 500;
    const rad2 = rad(x1, y1, game.player.x, game.player.y);
    let x4 = x1 + Math.cos(rad2) * 500;
    let y4 = y1 + Math.sin(rad2) * 500;


    game.context.fillStyle = 'black';
    game.context.beginPath();
    game.context.moveTo(x1, y1);
    game.context.lineTo(x2, y2);
    game.context.lineTo(x3, y3);
    game.context.lineTo(x4, y4);
    game.context.fill();

    // draw top
    game.context.fillStyle = 'rgba(0, 0, 0, 0.1)';
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
