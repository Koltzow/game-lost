import { distanceBetween } from './util';

export default class Wolf {

  constructor(x = 0, y = 0) {

    this.x = x;
    this.y = y;
    this.radius = 20;
    this.target = null;
    this.hasEaten = false;
    this.sightDistance = 100;

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
      this.x += (this.target.x - this.x) * 0.01;
      this.y += (this.target.y - this.y) * 0.01;
    }

  }

  draw(game) {

    let color = 'green';

    if(this.hasEaten){
      color = 'red';
    } else if (this.target) {
      color = 'yellow';
    }

    game.context.fillStyle = color;
    game.context.beginPath();
    game.context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    game.context.fill();

  }

}
