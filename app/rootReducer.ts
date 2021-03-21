import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import state from './src/redux/reducers/courseReducer';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    state,
  });
}
