export default class Tiner {

  constructor() {

    this.start = new Date();
    this.text = '00:00';

  }

  update() {

    const time = new Date() - this.start;
    const minutes = ~~(time/1000/60);
    const seconds = ~~(time/1000) - (minutes*60);

    this.text = `${minutes > 9 ? minutes : '0'+minutes}:${seconds > 9 ? seconds : '0'+seconds}`;

  }

  draw(game) {

    game.context.fillStyle = 'white';
    game.context.textAlign = 'center';
    game.context.font = '30px Arial';
    game.context.fillText(this.text, game.width/2, 50);

  }

}
