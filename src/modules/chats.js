import { createAction, handleActions } from 'redux-actions';

import { getAnonymous } from 'lib/utils/getRandom';

const CHANGE_FIELD = 'chats/CHANGE_FIELD';
const ADD_MESSAGE = 'chats/ADD_MESSAGE';

export const changeChatField = createAction(CHANGE_FIELD);
export const addMessage = createAction(ADD_MESSAGE);

const initialState = {
  isLobby: null,
  socket: null,
  me: getAnonymous(),
  chatLog: [],
};

const chats = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [ADD_MESSAGE]: (state, { payload }) => ({
      ...state,
      chatLog: state.chatLog.concat(payload),
    }),
  },
  initialState,
);

export default chats;
