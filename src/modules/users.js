import { createAction, handleActions } from 'redux-actions';
import { call, takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from 'lib/createRequestSaga';
import * as usersAPI from 'lib/api/users';

const CHANGE_FIELD = 'user/CHANGE_FIELD';
const [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE] = createRequestActionTypes('user/SIGNUP');
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('user/LOGIN');
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes('user/CHECK');
const LOGOUT = 'user/LOGOUT';
const [SEND_AUTH_EMAIL, SEND_AUTH_EMAIL_SUCCESS, SEND_AUTH_EMAIL_FAILURE] =
  createRequestActionTypes('user/SEND_AUTH_EMAIL');
const [CHECK_AUTH_EMAIL, CHECK_AUTH_EMAIL_SUCCESS, CHECK_AUTH_EMAIL_FAILURE] =
  createRequestActionTypes('user/CHECK_AUTH_EMAIL');
const [READ, READ_SUCCESS, READ_FAILURE] = createRequestActionTypes('user/READ');
const [UPDATE, UPDATE_SUCCESS, UPDATE_FAILURE] = createRequestActionTypes('user/UPDATE');
const [REMOVE, REMOVE_SUCCESS, REMOVE_FAILURE] = createRequestActionTypes('user/REMOVE');
const [CHECK_PASSWORD, CHECK_PASSWORD_SUCCESS, CHECK_PASSWORD_FAILURE] =
  createRequestActionTypes('user/CHECK_PASSWORD');
const [CHANGE_PASSWORD, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE] =
  createRequestActionTypes('user/CHANGE_PASSWORD');

export const changeField = createAction(CHANGE_FIELD);
export const signup = createAction(SIGNUP);
export const login = createAction(LOGIN);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);
export const sendAuthEmail = createAction(SEND_AUTH_EMAIL);
export const checkAuthEmail = createAction(CHECK_AUTH_EMAIL);
export const read = createAction(READ);
export const update = createAction(UPDATE);
export const remove = createAction(REMOVE);
export const checkPassword = createAction(CHECK_PASSWORD);
export const changePasssword = createAction(CHANGE_PASSWORD);

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
const sendAuthEmailSaga = createRequestSaga(SEND_AUTH_EMAIL, usersAPI.sendAuthEmail);
const checkAuthEmailSaga = createRequestSaga(CHECK_AUTH_EMAIL, usersAPI.checkAuthEmail);
const readSaga = createRequestSaga(READ, usersAPI.read);
const updateSaga = createRequestSaga(UPDATE, usersAPI.update);
const removeSaga = createRequestSaga(REMOVE, usersAPI.remove);
const checkPasswordSaga = createRequestSaga(CHECK_PASSWORD, usersAPI.checkPassword);
const changePassswordSaga = createRequestSaga(CHANGE_PASSWORD, usersAPI.changePassword);

export function* usersSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
  user: null,
};

const users = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
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
