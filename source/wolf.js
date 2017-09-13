import { distanceBetween, rotatePoint } from './util';

export default class Wolf {

  constructor(x = 0, y = 0) {

    this.x = x;
    this.y = y;
    this.radius = 20;
    this.radian = 0;
    this.target = null;
    this.hasEaten = false;
    this.sightDistance = 150;

  }

  update(game) {

    if(this.hasEaten){
      return;
    }

    this.target = null;

    if (game.player.sisters.length > 0){

      const lastSister = game.player.sisters[game.player.sisters.length-1];

      if (distanceBetween(this, lastSister) < 0) {
        this.hasEaten = true;
      } else if (distanceBetween(this, lastSister) < this.sightDistance) {
        this.target = lastSister;
      }

    } else {

      if (distanceBetween(this, game.player) < 0) {
        this.hasEaten = true;
      } else if (distanceBetween(this, game.player) < this.sightDistance) {
        this.target = game.player;
      }

    }

    if(this.target !== null) {
      const dx = this.target.x - this.x;
      const dy = this.target.y - this.y;

      this.x += dx * (1 - distanceBetween(this, this.target) / this.sightDistance) * 0.04;
      this.y += dy * (1 - distanceBetween(this, this.target) / this.sightDistance) * 0.04;

      this.radian = Math.atan2(dy, dx);

    }

  }

  draw(game) {

    let color = 'green';

    if(this.hasEaten){
      color = 'red';
    } else if (this.target) {
      color = 'yellow';
    }

    // draw body
    game.context.fillStyle = color;
    game.context.beginPath();
    game.context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    game.context.fill();

    // draw head
    game.context.beginPath();
    const p0 = rotatePoint(this.x, this.y, this.radian, this.x + 20, this.y);
    game.context.arc(p0.x, p0.y, 15, 0, Math.PI * 2);
    game.context.fill();

  }

}
