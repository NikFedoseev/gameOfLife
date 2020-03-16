import { getInitialMatrix, fillRandomStateMatrix } from "./utils";

export class GameOfLife {
  constructor(matrixSizeRow, matrixSizeCol, initialMatrixPath = null) {
    this.initializedWithInitalMatrix = false;
    if (initialMatrixPath) {
      this.matrix = getInitialMatrix(initialMatrixPath);
      this.matrixSizeRow = this.matrix.length;
      this.matrixSizeCol = this.matrix[0].length;
      this.initializedWithInitalMatrix = true;
    } else {
      this.matrix = fillRandomStateMatrix(matrixSizeRow, matrixSizeCol);
      this.matrixSizeRow = matrixSizeRow;
      this.matrixSizeCol = matrixSizeCol;
    }
  }

  getNextGenerationState() {
    // живая у которой меньше двух живых соседей - погибает
    // живая у которой 2 или 3 живих соседа - выживает
    // живая у которой больше 3 живых соседей - умирает
    // мертвая у оторой 3 живых соседа - возрождается
    for (let rowIndex = 0; rowIndex < this.matrixSizeRow; rowIndex++) {
      for (let colIndex = 0; colIndex < this.matrixSizeCol; colIndex++) {
        const currentCell = this.matrix[rowIndex][colIndex];

        const currentCellTopRow = rowIndex === 0 ? null : rowIndex - 1;
        const currentCellBottomRow =
          rowIndex === this.matrixSizeRow - 1 ? null : rowIndex + 1;
        const currentCellLeftColumn = colIndex === 0 ? null : colIndex - 1;
        const currentCellRightColumn =
          colIndex === this.matrixSizeCol - 1 ? null : colIndex + 1;

        const currentCellNeighbours = {
          topLeft:
            currentCellTopRow && currentCellLeftColumn
              ? this.matrix[currentCellTopRow][currentCellLeftColumn]
              : null,
          top: currentCellTopRow
            ? this.matrix[currentCellTopRow][colIndex]
            : null,
          topRight:
            currentCellTopRow && currentCellRightColumn
              ? this.matrix[currentCellTopRow][currentCellRightColumn]
              : null,
          left: currentCellLeftColumn
            ? this.matrix[rowIndex][currentCellLeftColumn]
            : null,
          right: currentCellRightColumn
            ? this.matrix[rowIndex][currentCellRightColumn]
            : null,
          bottomLeft:
            currentCellBottomRow && currentCellLeftColumn
              ? this.matrix[currentCellBottomRow][currentCellLeftColumn]
              : null,
          bottom: currentCellBottomRow
            ? this.matrix[currentCellBottomRow][colIndex]
            : null,
          bottomRight:
            currentCellBottomRow && currentCellRightColumn
              ? this.matrix[currentCellBottomRow][currentCellRightColumn]
              : null
        };

        const neighboursState = Object.values(currentCellNeighbours).reduce(
          (acc, cell) => {
            if (!cell) return acc;
            if (cell.getState() === "1") {
              acc.alive = acc.alive + 1;
            }
            if (cell.getState() === "0") {
              acc.dead = acc.dead + 1;
            }
            return acc;
          },
          { alive: 0, dead: 0 }
        );

        if (currentCell.getState() == "1") {
          if (neighboursState.alive >= 3) {
            currentCell.setState("0");
            break;
          } else if (neighboursState.alive >= 2) {
            currentCell.setState("0");
            break;
          } else {
            currentCell.setState("0");
            break;
          }
        }
        if (currentCell.getState() === "0") {
          if (neighboursState.alive == 3) {
            currentCell.setState("1");
            break;
          }
        }
      }
    }
  }

  draw() {
    console.clear();
    const matrixStr = this.matrix.reduce((acc, row) => {
      const str = row.map(cell => cell.getState()).join(" ") + "\r\n";
      acc += str;
      return acc;
    }, "");
    console.log(matrixStr);
  }

  init() {
    setInterval(() => {
      this.draw();

      this.getNextGenerationState();
    }, 1000);
  }
}
