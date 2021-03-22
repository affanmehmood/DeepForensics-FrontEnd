import * as types from './actionTypes';

const nodeConsole = require('console');

const myConsole = new nodeConsole.Console(process.stdout, process.stderr);
const progressAction = (newProgress) => {
  return { type: types.UPDATE_PROGRESS, newProgress };
};
export default progressAction;
