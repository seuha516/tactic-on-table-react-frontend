import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from 'lib/createRequestSaga';
import * as roomsAPI from 'lib/api/rooms';

const CHANGE_FIELD = 'rooms/CHANGE_FIELD';
const [GET_LIST, GET_LIST_SUCCESS, GET_LIST_FAILURE] = createRequestActionTypes('rooms/GET_LIST');
const [CREATE, CREATE_SUCCESS, CREATE_FAILURE] = createRequestActionTypes('rooms/CREATE');
const [UPDATE, UPDATE_SUCCESS, UPDATE_FAILURE] = createRequestActionTypes('rooms/UPDATE');

export const changeRoomField = createAction(CHANGE_FIELD);
export const getRoomList = createAction(GET_LIST);
export const createRoom = createAction(CREATE);
export const updateRoom = createAction(UPDATE);

const getListSaga = createRequestSaga(GET_LIST, roomsAPI.getList);
const createSaga = createRequestSaga(CREATE, roomsAPI.create);
const updateSaga = createRequestSaga(UPDATE, roomsAPI.update);

export function* roomsSaga() {
  yield takeLatest(GET_LIST, getListSaga);
  yield takeLatest(CREATE, createSaga);
  yield takeLatest(UPDATE, updateSaga);
}

const initialState = {
  list: null,
  room: null,
  create: null,
  update: null,
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
      return { ...state, create: payload };
    },
    [CREATE_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return { ...state, create: null };
    },
    [UPDATE_SUCCESS]: (state, { payload }) => {
      return { ...state, room: payload, update: true };
    },
    [UPDATE_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return { ...state, update: false };
    },
  },
  initialState,
);
export default rooms;
