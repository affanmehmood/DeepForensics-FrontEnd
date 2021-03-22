import * as types from './actionTypes';

const nodeConsole = require('console');

const myConsole = new nodeConsole.Console(process.stdout, process.stderr);
const updateStateAction = (newState) => {
  return { type: types.UPDATE_STATE, newState };
};
export default updateStateAction;
