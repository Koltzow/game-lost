import Box from './box';
import Tree from './tree';
import {
  randomIntInRange,
  randomBetween
  } from './util';

export default class Grid {

  constructor(columns = 20, rows = 20, columnWidth = 150, rowHeight = 150){

    // number of columns and rows
    this.columns = columns;
    this.rows = rows;

    // grid area
    this.area = this.columns * this.rows;

    // width of columns and rows
    this.columnWidth = columnWidth;
    this.rowHeight = rowHeight;

    // number of box sizes
    this.boxScales = 5;

  }


  randomOffset(length){

    // used to divide side length
    const divider = randomIntInRange(1, this.boxScales);

    // get box width and height
    const width = length / divider;

    // Get an offset that is a multiple of width,
    // between 0 and this.columnWidth - boxWidth
    return width * randomIntInRange(0, divider);

  }


  addTrees(game){

    for (let i = 0; i < this.area; i++) {

      // Add trees to game
      game.trees.push( new Tree(
        (( i % this.columns ) * this.columnWidth ) + this.randomOffset(this.columnWidth),
        (Math.floor( i / this.rows ) * this.rowHeight) + this.randomOffset(this.rowHeight),
        randomIntInRange(15, 20),
        randomIntInRange(50, 150)
      ));

    }

  }


  addBoxes(game){

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
        (( i % this.columns ) * this.columnWidth ) + widthOffset,
        ( Math.floor( i / this.rows ) * this.rowHeight ) + heightOffset,
        width,
        height
      ));

    }

  }

}
