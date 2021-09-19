import {
  createActions,
  createReducer,
} from 'reduxsauce';
import { INITIAL_STATE } from './model';

const setActiveTab = (state, { tabId }) => {
  return {
    ...state,
    activeTab: tabId,
  };
};

const openUserSidebar = (state) => ({ ...state, userSidebar: true });

const closeUserSidebar = (state) => ({
  ...state,
  userSidebar: false,
});

const setConversationNameInOpenChat = (state, { conversationName }) => ({
  ...state,
  conversationName,
});

export const { Types, Creators } = createActions({
  setActiveTab: ['tabId'],
  openUserSidebar: [],
  closeUserSidebar: [],
  setConversationNameInOpenChat: ['conversationName'],
});

export const HANDLERS = {
  [Types.SET_ACTIVE_TAB]: setActiveTab,
  [Types.OPEN_USER_SIDEBAR]: openUserSidebar,
  [Types.CLOSE_USER_SIDEBAR]: closeUserSidebar,
  [Types.SET_CONVERSATION_NAME_IN_OPEN_CHAT]: setConversationNameInOpenChat,
};

export default createReducer(INITIAL_STATE, HANDLERS);
