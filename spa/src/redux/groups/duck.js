import { createActions, createReducer } from 'reduxsauce';
import { INITIAL_STATE } from './model';

const setSearchMode = (state) => ({ ...state, searchMode: true });

const setCreateMode = (state) => ({ ...state, createMode: true });

const createGroup = (state) => ({ ...state, loading: true });

const menuGroup = (state) => ({
  ...state,
  searchMode: false,
  createMode: false,
});

const createGroupSuccess = (state) => ({
  ...state,
  loading: false,
  createMode: false,
  searchMode: false,
});

const searchGroup = (state) => ({ ...state, loading: true });

const searchGroupSuccess = (state, { searchedGroups }) => ({
  ...state,
  loading: false,
  searchedGroups,
});

const associateUser = (state) => ({ ...state, loading: true });

const associateUserSuccess = (state) => ({ ...state, loading: false });

const onFailure = (state, { errors }) => ({
  ...state,
  loading: false,
  errors: {
    ...state.errors,
    ...errors,
  },
});

export const { Types, Creators } = createActions({
  setSearchMode: [],
  setCreateMode: [],
  createGroup: ['group'],
  menuGroup: [],
  createGroupSuccess: ['group'],
  searchGroup: ['term'],
  searchGroupSuccess: ['searchedGroups'],
  associateUser: ['groupId'],
  associateUserSuccess: [],
  onFailure: ['errors'],
});

export const HANDLERS = {
  [Types.SET_SEARCH_MODE]: setSearchMode,
  [Types.SET_CREATE_MODE]: setCreateMode,
  [Types.CREATE_GROUP]: createGroup,
  [Types.MENU_GROUP]: menuGroup,
  [Types.CREATE_GROUP_SUCCESS]: createGroupSuccess,
  [Types.SEARCH_GROUP]: searchGroup,
  [Types.SEARCH_GROUP_SUCCESS]: searchGroupSuccess,
  [Types.ASSOCIATE_USER]: associateUser,
  [Types.ASSOCIATE_USER_SUCCESS]: associateUserSuccess,
  [Types.ON_FAILURE]: onFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
