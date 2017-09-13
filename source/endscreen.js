export default class Endscreen {

  update(game) {

    if (game.keyboard.isPressed(game.keyboard.SPACE)) {
      game.play();
    }

  }

  draw(game) {

    // draw background
    game.context.fillStyle = 'black';
    game.context.fillRect(0, 0, game.width, game.height);

    // draw text
    game.context.fillStyle = 'white';
    game.context.font = '30px Arial';
    game.context.textAlign = 'center';
    const string = (game.player.dead) ? 'You were eaten!' : 'You survived!';
    game.context.fillText(string, game.width/2, game.height*0.4);
    let count = 0;
    game.player.sisters.forEach(sister => {
      if(!sister.dead) {
        count = count + 1;
      }
    });

    game.context.fillText(`Sisters saved: ${count}`, game.width/2, game.height*0.5);

    if (Math.sin(game.frame/15) > 0.2) {
      game.context.font = '30px Arial';
      game.context.fillText('Press space to restart', game.width/2, game.height*0.8);
    }

  }

}
