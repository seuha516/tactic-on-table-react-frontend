import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from 'lib/createRequestSaga';
import * as roomsAPI from 'lib/api/rooms';

const CHANGE_FIELD = 'rooms/CHANGE_FIELD';
const [GET_LIST, GET_LIST_SUCCESS, GET_LIST_FAILURE] = createRequestActionTypes('rooms/GET_LIST');
const [CREATE, CREATE_SUCCESS, CREATE_FAILURE] = createRequestActionTypes('rooms/CREATE');
const [QUICK_MATCH, QUICK_MATCH_SUCCESS, QUICK_MATCH_FAILURE] =
  createRequestActionTypes('rooms/QUICK_MATCH');

export const changeRoomField = createAction(CHANGE_FIELD);
export const getRoomList = createAction(GET_LIST);
export const createRoom = createAction(CREATE);
export const quickMatch = createAction(QUICK_MATCH);

const getListSaga = createRequestSaga(GET_LIST, roomsAPI.getList);
const createSaga = createRequestSaga(CREATE, roomsAPI.create);
const quickMatchSage = createRequestSaga(QUICK_MATCH, roomsAPI.quickMatch);

export function* roomsSaga() {
  yield takeLatest(GET_LIST, getListSaga);
  yield takeLatest(CREATE, createSaga);
  yield takeLatest(QUICK_MATCH, quickMatchSage);
}

const initialState = {
  list: null,
  password: '',
  create: null,
  room: null,
  game: null,
};

const rooms = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [GET_LIST_SUCCESS]: (state, { payload }) => {
      return { ...state, list: payload.result };
    },
    [GET_LIST_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return { ...state, list: null };
    },
    [CREATE_SUCCESS]: (state, { payload }) => {
      return { ...state, create: payload.code };
    },
    [CREATE_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return { ...state, create: null };
    },
    [QUICK_MATCH_SUCCESS]: (state, { payload }) => {
      return { ...state, create: payload.code };
    },
    [QUICK_MATCH_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return { ...state, create: null };
    },
  },
  initialState,
);
export default rooms;
