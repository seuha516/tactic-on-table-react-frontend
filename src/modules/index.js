import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import loading from 'modules/loading';
import users, { usersSaga } from 'modules/users';
import rooms, { roomsSaga } from 'modules/rooms';
import chats from 'modules/chats';

const rootReducer = combineReducers({
  loading,
  users,
  rooms,
  chats,
});

export function* rootSaga() {
  yield all([usersSaga(), roomsSaga()]);
}

export default rootReducer;
