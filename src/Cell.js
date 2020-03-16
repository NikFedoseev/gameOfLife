export class Cell {
  constructor(rowIndex, colIndex, state) {
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;
    this.state = state;
  }
  getRowIndex() {
    return this.rowIndex;
  }

  getColIndex() {
    return this.colIndex;
  }

  getState() {
    return this.state;
  }
  setState(newState) {
    this.state = newState;
  }
}
