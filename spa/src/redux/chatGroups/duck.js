import { createActions, createReducer } from 'reduxsauce';
import { INITIAL_STATE } from './model';

const onConnectSuccess = (state, { connection }) => {
  return { ...state, connection };
};

const receiveMessage = (state, { message }) => {
  return {
    ...state,
    messages: [...state.messages, message],
  };
};

const messagesFromGroupSuccess = (state, { groupMessages, group }) => {
  return {
    ...state,
    groupSelected: group,
    groupMessages,
  };
};

const onFailure = (state, { errors }) => ({
  ...state,
  loading: false,
  errors: {
    ...state.errors,
    ...errors,
  },
});

export const { Types, Creators } = createActions({
  onConnect: [],
  receiveMessage: ['message'],
  messagesFromGroup: ['group'],
  messagesFromGroupSuccess: ['groupMessages', 'group'],
  onConnectSuccess: ['connection'],
  onFailure: ['errors'],
});

export const HANDLERS = {
  [Types.ON_CONNECT_SUCCESS]: onConnectSuccess,
  [Types.RECEIVE_MESSAGE]: receiveMessage,
  [Types.MESSAGES_FROM_GROUP_SUCCESS]: messagesFromGroupSuccess,
  [Types.ON_FAILURE]: onFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
