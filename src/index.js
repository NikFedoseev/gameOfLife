import { GameOfLife } from "./GameOfLife";

const defaultConfig = {
  initialMatrixPath: null,
  matrixSizeRow: 20,
  matrixSizeCol: 20
};

const processArgs = process.argv.reduce((acc, arg) => {
  if (arg.indexOf("--path") !== -1) {
    acc["initialMatrixPath"] = arg.split("--path=")[1];
  }
  if (arg.indexOf("--rows") !== -1) {
    acc["matrixSizeRow"] = Number(arg.split("--rows=")[1]);
  }
  if (arg.indexOf("--cols") !== -1) {
    acc["matrixSizeCol"] = Number(arg.split("--cols=")[1]);
  }
  return acc;
}, {});

const config = { ...defaultConfig, ...processArgs };

const gameOfLife = new GameOfLife(config);
gameOfLife.init();
