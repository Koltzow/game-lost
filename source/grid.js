import Box from './box';
import { randomIntInRange } from './util';

export default class Grid {
  constructor(game){
    // number of columns and rows
    this.columns = game.columns || 5;
    this.rows = game.rows || 5;

    // grid area
    this.area = this.columns * this.rows;

    // width of columns and rows
    this.columnWidth = game.columnWidth || 150;
    this.rowHeight = game.rowHeight || 150;

    this.gridMargin = 100;

    // number of box sizes
    this.boxScales = 5;
  }

  drawBoxes(game){

    for (let i = 0; i < this.area; i++) {

      // used to divide side length
      const divider = randomIntInRange(1, this.boxScales);

      // get box width and height
      const width = this.columnWidth / divider;
      const height = this.rowHeight / divider;

      // Get an offset that is a multiple of width,
      // between 0 and this.columnWidth - boxWidth
      const widthOffset = width * randomIntInRange(0, divider);
      const heightOffset = height * randomIntInRange(0, divider);

      // Add boxes to game
      game.boxes.push( new Box(
        ( ( i % this.columns ) * this.columnWidth ) + widthOffset + this.gridMargin,
        ( Math.floor( i / this.rows ) * this.rowHeight ) + heightOffset + this.gridMargin,
        width,
        height
      ));
    }
  }
}
