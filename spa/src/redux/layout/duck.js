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

const openGroupSideBar = (state) => ({ ...state, groupSideBar: true });

const closeGroupSideBar = (state) => ({
  ...state,
  groupSideBar: false,
});

const setConversationNameInOpenChat = (state, { conversationName }) => ({
  ...state,
  conversationName,
});

export const { Types, Creators } = createActions({
  setActiveTab: ['tabId'],
  openGroupSideBar: [],
  closeGroupSideBar: [],
  setConversationNameInOpenChat: ['conversationName'],
});

export const HANDLERS = {
  [Types.SET_ACTIVE_TAB]: setActiveTab,
  [Types.OPEN_GROUP_SIDE_BAR]: openGroupSideBar,
  [Types.CLOSE_GROUP_SIDE_BAR]: closeGroupSideBar,
  [Types.SET_CONVERSATION_NAME_IN_OPEN_CHAT]: setConversationNameInOpenChat,
};

export default createReducer(INITIAL_STATE, HANDLERS);
