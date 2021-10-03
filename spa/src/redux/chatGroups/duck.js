import { createActions, createReducer } from 'reduxsauce';

import { INITIAL_STATE } from './model';

const onConnectSuccess = (state, { connection }) => {
  return { ...state, connection };
};

const onDisconnect = (state) => {
  return { ...state, connection: {} };
};

const setEditing = (state) => {
  return {
    ...state,
    groupSelected: {
      ...state.groupSelected,
      editing: true,
    },
  };
};

const updateGroup = (state) => ({
  ...state,
  loading: true,
});

const updateGroupSuccess = (state, { group }) => ({
  ...state,
  groupSelected: { ...state.groupSelected, ...group },
  loading: false,
});

const updateGroupImage = (state) => ({
  ...state,
  groupSelected: {
    ...state.groupSelected,
    loading: true,
  },
});

const updateGroupImageSuccess = (state, { image }) => ({
  ...state,
  groupSelected: { ...state.groupSelected, picture: image },
});

const receiveMessage = (state, { message, user }) => {
  const groupId = state.groupSelected.id;
  if (groupId !== message.groupName) {
    return { ...state };
  }

  const newMessage = {
    createdAt: message.createdAt,
    groupId: message.groupName,
    message: message.message,
    user: {
      id: message.userId,
      name: message.name,
      picture: message.picture,
    },
    isMine: user.userToken.id === message.userId,
  };

  return {
    ...state,
    groupMessages: [...state.groupMessages, newMessage],
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
  setEditing: [],
  updateGroup: ['group'],
  updateGroupSuccess: ['group'],
  updateGroupImage: ['name', 'base64', 'uriImage', 'groupId'],
  updateGroupImageSuccess: ['image'],
  receiveMessage: ['message', 'user'],
  messagesFromGroup: ['group'],
  messagesFromGroupSuccess: ['groupMessages', 'group'],
  dispatchMessage: ['messageValues'],
  onConnectSuccess: ['connection'],
  onDisconnect: [],
  onFailure: ['errors'],
});

export const HANDLERS = {
  [Types.SET_EDITING]: setEditing,
  [Types.UPDATE_GROUP]: updateGroup,
  [Types.UPDATE_GROUP_SUCCESS]: updateGroupSuccess,
  [Types.UPDATE_GROUP_IMAGE]: updateGroupImage,
  [Types.UPDATE_GROUP_IMAGE_SUCCESS]: updateGroupImageSuccess,
  [Types.ON_CONNECT_SUCCESS]: onConnectSuccess,
  [Types.RECEIVE_MESSAGE]: receiveMessage,
  [Types.MESSAGES_FROM_GROUP_SUCCESS]: messagesFromGroupSuccess,
  [Types.ON_DISCONNECT]: onDisconnect,
  [Types.ON_FAILURE]: onFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
