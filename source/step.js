export default class Step {

  constructor(x = 0, y = 0) {

    this.x = x;
    this.y = y;
    this.radius = 3;
    this.life = 60 * 3;

  }

  update(game) {

    this.life--;

    if(this.life <= 0) {
      game.steps.pop();
    }

    return true;

  }

  draw(game) {

    const opacity = 0.1/50*this.life;

    game.context.fillStyle = `rgba(0,0,0,${opacity})`;
    game.context.beginPath();
    game.context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    game.context.fill();

    return true;

  }

}
