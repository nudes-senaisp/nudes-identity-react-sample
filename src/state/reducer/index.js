import { combineReducers } from 'redux';
import { reducer } from 'redux-oidc';

export function createRootReducer() {
  return combineReducers({
    oidc: reducer,
  });
}
