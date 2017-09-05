export default class Debugger {

  constructor() {
    this.output = [];
    this.frames = [];
  }

  add(string) {
    this.output.push(string);
  }

  addFrame(fps) {
    this.frames.unshift(fps);
  }

  clear() {
    this.output = [];
    if(this.frames.length > 200) {
      this.frames.pop();
    }
  }

  draw(game) {

    game.context.fillStyle = 'rgba(0,255,0,0.5)';
    game.context.fillRect(0, 0, 200, 70 + 20 + this.output.length * 20);

    this.frames.forEach((f, i) => {
      game.context.fillRect(200-1-i, 70 - f, 1, f);
    });

    game.context.fillStyle = 'white';
    game.context.font = "15px monospace";

    this.output.forEach((o, i) => {
      game.context.fillText(o, 12, 70 + 25 + i * 20);
    });

    this.clear();

  }

}
