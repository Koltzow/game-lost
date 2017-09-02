export default class Grid {
  constructor(game){
    this.columns = game.columns || 5;
    this.rows = game.rows || 5;

    this.columnWidth = game.columnWidth || 300;
    this.rowHeight = game.rowHeight || 300;
  }
}
