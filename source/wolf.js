import { distanceBetween, rotatePoint, randomBetween } from './util';

export default class Wolf {

  constructor(x = 0, y = 0) {

    this.x = x;
    this.y = y;
    this.radius = 15;
    this.radian = randomBetween(0, 3);
    this.target = null;
    this.hasEaten = false;
    this.sightDistance = 150;

  }

  update(game) {

    if(this.hasEaten){
      return;
    }

    this.target = null;
    let lastSister = null;

    game.player.sisters.forEach(sister => {
      if(!sister.dead){
        lastSister = sister;
        return;
      }
    });

    if (game.player.sisters.length > 0 && lastSister){

      if (distanceBetween(this, lastSister) < 0) {
        this.hasEaten = true;
        lastSister.kill();
      } else if (distanceBetween(this, lastSister) < this.sightDistance) {
        this.target = lastSister;
      }

    } else {

      if (distanceBetween(this, game.player) < 0) {
        this.hasEaten = true;
        game.player.kill();
        game.state = 'FINISHED';
        return;

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

    let color = '#ccc';

    if(this.hasEaten){
      //color = 'red';
    } else if (this.target) {
      //color = 'yellow';
    }

    // draw butt
    game.context.fillStyle = color;
    game.context.beginPath();
    const p2 = rotatePoint(this.x, this.y, this.radian, this.x - 15, this.y);
    game.context.arc(p2.x, p2.y, 10, 0, Math.PI*2);
    game.context.fill();

    // draw body
    game.context.beginPath();
    game.context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    game.context.fill();

    // draw head
    game.context.beginPath();
    const p0 = rotatePoint(this.x, this.y, this.radian, this.x + 15, this.y);
    game.context.arc(p0.x, p0.y, 10, 0, Math.PI * 2);
    game.context.fill();

    // draw snout
    game.context.beginPath();
    const p1 = rotatePoint(this.x, this.y, this.radian, this.x + 25, this.y);
    game.context.arc(p1.x, p1.y, 5, 0, Math.PI * 2);
    game.context.fill();

    // draw nose
    game.context.fillStyle = 'black';
    game.context.beginPath();
    const p3 = rotatePoint(this.x, this.y, this.radian, this.x + 29, this.y);
    game.context.arc(p3.x, p3.y, 2, 0, Math.PI * 2);
    game.context.fill();

  }

}
