import { createAction, handleActions } from 'redux-actions';
import { call, takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from 'lib/createRequestSaga';
import * as usersAPI from 'lib/api/users';

const CHANGE_FIELD = 'users/CHANGE_FIELD';
const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] = createRequestActionTypes('users/SIGNUP');
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('users/LOGIN');
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes('users/CHECK');
const LOGOUT = 'users/LOGOUT';
const [READ, READ_SUCCESS, READ_FAILURE] = createRequestActionTypes('users/READ');
const [UPDATE, UPDATE_SUCCESS, UPDATE_FAILURE] = createRequestActionTypes('users/UPDATE');
const [REMOVE, REMOVE_SUCCESS, REMOVE_FAILURE] = createRequestActionTypes('users/REMOVE');
const [GET_RANKING, GET_RANKING_SUCCESS, GET_RANKING_FAILURE] = createRequestActionTypes('users/GET_RANKING');
const [GET_RECORD, GET_RECORD_SUCCESS, GET_RECORD_FAILURE] = createRequestActionTypes('users/GET_RECORD');

export const changeField = createAction(CHANGE_FIELD);
export const signup = createAction(SIGNUP);
export const login = createAction(LOGIN);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);
export const read = createAction(READ);
export const update = createAction(UPDATE);
export const remove = createAction(REMOVE);
export const getRanking = createAction(GET_RANKING);
export const getRecord = createAction(GET_RECORD);

const signupSaga = createRequestSaga(SIGNUP, usersAPI.signup);
const loginSaga = createRequestSaga(LOGIN, usersAPI.login);
const checkSaga = createRequestSaga(CHECK, usersAPI.check);
function checkFailureSaga() {
  try {
    localStorage.removeItem('user');
  } catch (e) {
    console.log('localStorage is not working');
  }
}
function* logoutSaga() {
  try {
    yield call(usersAPI.logout);
    localStorage.removeItem('user');
  } catch (e) {
    console.log(e);
  }
}
const readSaga = createRequestSaga(READ, usersAPI.read);
const updateSaga = createRequestSaga(UPDATE, usersAPI.update);
const removeSaga = createRequestSaga(REMOVE, usersAPI.remove);
const getRankingSaga = createRequestSaga(GET_RANKING, usersAPI.getRanking);
const getRecordSaga = createRequestSaga(GET_RECORD, usersAPI.getRecord);

export function* usersSaga() {
  yield takeLatest(SIGNUP, signupSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(READ, readSaga);
  yield takeLatest(UPDATE, updateSaga);
  yield takeLatest(REMOVE, removeSaga);
  yield takeLatest(GET_RANKING, getRankingSaga);
  yield takeLatest(GET_RECORD, getRecordSaga);
}

const initialState = {
  user: null,
  ranking: null,
  record: null,
};

const users = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),

    [GET_RANKING]: state => {
      return { ...state, ranking: null };
    },
    [GET_RANKING_SUCCESS]: (state, { payload }) => {
      return { ...state, ranking: payload };
    },
    [GET_RANKING_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return state;
    },

    [GET_RECORD]: state => {
      return { ...state, record: null };
    },
    [GET_RECORD_SUCCESS]: (state, { payload }) => {
      return { ...state, record: payload };
    },
    [GET_RECORD_FAILURE]: (state, { payload: error }) => {
      alert(error.response.data.message);
      return state;
    },

    // [LOGIN_SUCCESS]: (state, { payload: user }) => {
    //   return { user };
    // },
    // [LOGIN_FAILURE]: (state, { payload: error }) => {
    //   alert(error.response.data.message);
    //   return state;
    // },
    // [CHECK_SUCCESS]: state => {
    //   return state;
    // },
    // [CHECK_FAILURE]: () => {
    //   return { user: null };
    // },
    // [LOGOUT]: () => {
    //   return { user: null };
    // },
  },
  initialState,
);
export default users;
