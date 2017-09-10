export default class Endscreen {

  update(game) {

    if (game.keyboard.isPressed(game.keyboard.SPACE)) {

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
    game.context.fillText('You survived!', game.width/2, game.height*0.4);
    game.context.fillText(`Sisters saved: ${game.player.sisters.length}`, game.width/2, game.height*0.5);

    if (Math.sin(game.frame/15) > 0.2) {
      game.context.font = '30px Arial';
      game.context.fillText('Press space to restart', game.width/2, game.height*0.8);
    }

  }

}
