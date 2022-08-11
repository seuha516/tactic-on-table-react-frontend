import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import loading from 'modules/loading';
import users, { usersSaga } from 'modules/users';
import chats from 'modules/chats';

const rootReducer = combineReducers({
  loading,
  users,
  chats,
});

export function* rootSaga() {
  yield all([usersSaga()]);
}

export default rootReducer;
