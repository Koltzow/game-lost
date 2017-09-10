import { distanceBetween, rad } from './util';

export default class Hint {

  constructor() {

    this.radian = null;
    this.x = 0;
    this.y = 0;
    this.radius = 200;

  }

  update(game) {

    let closest = null;
    let target = null;

    game.sisters.forEach((sister) => {

      const dist = distanceBetween(game.player, sister);

      if (dist < closest || !closest) {
        closest = dist;
        target = sister;
      }

    });

    if(closest < this.radius) {
      this.radian = null;
      return;
    }

    if(target) {
      this.radian = rad(target.x, target.y, game.player.x, game.player.y);
      this.x += ((Math.cos(this.radian) * this.radius + game.width/2) - this.x) * 0.5;
      this.y += ((Math.sin(this.radian) * this.radius + game.height/2) - this.y) * 0.5;
    }

  }

  draw(game) {

    if (this.radian) {

      game.context.fillStyle = `rgba(255,255,255, ${(Math.sin(game.frame/20)+1)/2 - 0.8})`;
  		game.context.beginPath();
  		game.context.arc( this.x, this.y, Math.sin(game.frame/20) * 5 + 15, 0, 2*Math.PI );
  		game.context.fill();

    }

  }

}
