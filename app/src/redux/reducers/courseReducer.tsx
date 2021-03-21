import * as types from '../actions/actionTypes';

const nodeConsole = require('console');

const myConsole = new nodeConsole.Console(process.stdout, process.stderr);
export default function stateReducer(state = [], action) {
  switch (action.type) {
    case types.UPDATE_STATE:
      myConsole.log('reducer', ...action.newState);
      return { ...state, ...action.newState };
    default:
      return state;
  }
}
