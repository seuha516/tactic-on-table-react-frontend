import { createAction, handleActions } from 'redux-actions';

import { getAnonymous } from 'lib/utils/getRandom';

const CHANGE_FIELD = 'chats/CHANGE_FIELD';
const ADD_MESSAGE = 'chats/ADD_MESSAGE';

export const changeField = createAction(CHANGE_FIELD);
export const addMessage = createAction(ADD_MESSAGE);

const initialState = {
  socket: null,
  me: getAnonymous(),
  chatLog: [],
  gameLog: [],
};

const chats = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [ADD_MESSAGE]: (state, { payload: { key, value } }) => ({
      ...state,
      [`${key}Log`]: state[`${key}Log`].concat(value),
    }),
  },
  initialState,
);

export default chats;
