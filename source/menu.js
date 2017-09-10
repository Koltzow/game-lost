export default class Menu {

  update(game) {

    if(game.keyboard.isPressed(game.keyboard.SPACE)) {
      game.play();
    }

  }

  draw(game) {

    game.context.fillStyle = 'black';
    game.context.fillRect(0, 0, game.width, game.height);

    game.context.fillStyle = 'white';
    game.context.textAlign = 'center';
    game.context.font = '100px Arial';
    game.context.fillText('Riding', game.width/2, game.height*0.4);
    game.context.fillText('Hoods', game.width/2, game.height*0.6);

    if (Math.sin(game.frame/15) > 0.2) {
      game.context.font = '30px Arial';
      game.context.fillText('Press space to start', game.width/2, game.height*0.8);
    }

  }

}
