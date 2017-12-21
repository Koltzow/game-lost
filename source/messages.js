export default class Messages {

  constructor() {
    // define messages
    this.messages = [];
  }

  add(text = '', duration = 60) {

    // define single message
    const message = {
      text,
      duration,
    };

    // add message
    this.messages.push(message);

  }

  update(){

    // check for messages
    if(this.messages.length <= 0){
      return;
    }

    // iterate duration
    this.messages[0].duration--;

    // shift if done
    if(this.messages[0].duration <= 0) {
      this.messages.shift();
    }

  }

  draw(game){

    // check for messages
    if(this.messages.length <= 0){
      return;
    }

    // draw message
    game.context.fillStyle = 'white';
    game.context.textAlign = 'center';
    game.context.font = '30px Arial';
    game.context.fillText(this.messages[0].text, game.width/2, game.height/2 - 200);
  }
}
