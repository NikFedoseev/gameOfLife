import fs from "fs";
import { Cell } from "../Cell";

export const getInitialMatrix = path => {
  const matrixFileContent = fs.readFileSync(path, { encoding: "utf-8" });
  const arrayOfRows = matrixFileContent.split("\r\n");
  const matrix = arrayOfRows.map((row, rowIndex) => {
    const columns = row.split(" ");
    const cellsArr = columns.map(
      (state, colIndex) => new Cell(rowIndex, colIndex, state)
    );
    return cellsArr;
  });
  return matrix;
};

export const fillZeroMatrix = (matrixSizeRow, matrixSizeCol) => {
  return Array(matrixSizeRow)
    .fill("0")
    .map(() => Array(matrixSizeCol).fill("0"));
};

const getRandomState = () => {
  return Math.random() >= 0.5 ? "1" : "0";
};

export const fillRandomStateMatrix = (matrixSizeRow, matrixSizeCol) => {
  const matrix = fillZeroMatrix(matrixSizeRow, matrixSizeCol);
  return matrix.map((row, rowIndex) => {
    return row.map((_, colIndex) => {
      const state = getRandomState();
      return new Cell(rowIndex, colIndex, state);
    });
  });
};
