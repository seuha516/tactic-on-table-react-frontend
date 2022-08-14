import { createAction, handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from 'lib/createRequestSaga';
import * as usersAPI from 'lib/api/users';
import { getAnonymous } from 'lib/utils/getRandom';

const CHANGE_FIELD = 'users/CHANGE_FIELD';
const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] = createRequestActionTypes('users/SIGNUP');
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('users/LOGIN');
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes('users/CHECK');
const LOGOUT = 'users/LOGOUT';
const [READ, READ_SUCCESS, READ_FAILURE] = createRequestActionTypes('users/READ');
const [UPDATE, UPDATE_SUCCESS, UPDATE_FAILURE] = createRequestActionTypes('users/UPDATE');
const [REMOVE, REMOVE_SUCCESS, REMOVE_FAILURE] = createRequestActionTypes('users/REMOVE');
const [GET_RECORD, GET_RECORD_SUCCESS, GET_RECORD_FAILURE] =
  createRequestActionTypes('users/GET_RECORD');
const [GET_RANKING, GET_RANKING_SUCCESS, GET_RANKING_FAILURE] =
  createRequestActionTypes('users/GET_RANKING');

export const changeUserField = createAction(CHANGE_FIELD);
export const signup = createAction(SIGNUP);
export const login = createAction(LOGIN);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);
export const readUser = createAction(READ);
export const updateUser = createAction(UPDATE);
export const removeUser = createAction(REMOVE);
export const getRecord = createAction(GET_RECORD);
export const getRanking = createAction(GET_RANKING);

const signupSaga = createRequestSaga(SIGNUP, usersAPI.signup);
const loginSaga = createRequestSaga(LOGIN, usersAPI.login);
const checkSaga = createRequestSaga(CHECK, usersAPI.check);
function* checkFailureSaga() {
  try {
    localStorage.removeItem('user');
    yield put({ type: 'chats/CHANGE_FIELD', payload: { key: 'me', value: getAnonymous() } });
  } catch (e) {
    console.log('localStorage is not working');
  }
}
function* logoutSaga() {
  try {
    yield call(usersAPI.logout);
    localStorage.removeItem('user');
    yield put({ type: 'chats/CHANGE_FIELD', payload: { key: 'me', value: getAnonymous() } });
  } catch (e) {
    console.log(e);
  }
}
const readSaga = createRequestSaga(READ, usersAPI.read);
const updateSaga = createRequestSaga(UPDATE, usersAPI.update);
const removeSaga = createRequestSaga(REMOVE, usersAPI.remove);
const getRecordSaga = createRequestSaga(GET_RECORD, usersAPI.getRecord);
const getRankingSaga = createRequestSaga(GET_RANKING, usersAPI.getRanking);

export function* usersSaga() {
  yield takeLatest(SIGNUP, signupSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(READ, readSaga);
  yield takeLatest(UPDATE, updateSaga);
  yield takeLatest(REMOVE, removeSaga);
  yield takeLatest(GET_RECORD, getRecordSaga);
  yield takeLatest(GET_RANKING, getRankingSaga);
}

const initialState = {
  user: null,
  read: {
    data: null,
    error: null,
  },
  record: null,
  ranking: null,
  update: false,
  remove: false,
};

const users = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),

    [SIGNUP_SUCCESS]: (state, { payload }) => {
      return { ...state, user: payload };
    },
    [SIGNUP_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return { ...state, user: null };
    },
    [LOGIN_SUCCESS]: (state, { payload }) => {
      return { ...state, user: payload };
    },
    [LOGIN_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return { ...state, user: null };
    },
    [CHECK_FAILURE]: state => {
      return { ...state, user: null };
    },
    [LOGOUT]: state => {
      return { ...state, user: null };
    },

    [READ_SUCCESS]: (state, { payload }) => {
      return { ...state, read: { ...state.read, data: payload } };
    },
    [READ_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return { ...state, read: { ...state.read, error: error } };
    },
    [UPDATE_SUCCESS]: (state, { payload }) => {
      return { ...state, user: payload, update: true };
    },
    [UPDATE_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return { ...state, update: false };
    },
    [REMOVE_SUCCESS]: state => {
      return { ...state, remove: true };
    },
    [REMOVE_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return { ...state, remove: false };
    },

    [GET_RECORD_SUCCESS]: (state, { payload }) => {
      return { ...state, record: payload };
    },
    [GET_RECORD_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return { ...state, record: null };
    },
    [GET_RANKING_SUCCESS]: (state, { payload }) => {
      return { ...state, ranking: payload };
    },
    [GET_RANKING_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return { ...state, ranking: null };
    },
  },
  initialState,
);
export default users;
