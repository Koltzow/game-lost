export default class Messages {

  constructor(message, duration) {

    this.message = message;
    this.duration = (duration || 1000);
    console.log(this.duration);
  }

  update(duration){
    this.duration = this.duration - 1;
  }

  draw(game){
    game.context.fillStyle = 'white';
    game.context.textAlign = 'center';
    game.context.font = '30px Arial';
    game.context.fillText(this.message, game.width/2, game.height/2 - 200);
  }
}
