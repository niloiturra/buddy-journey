import {
  createActions,
  createReducer,
  Types as ReduxSauceTypes,
} from 'reduxsauce';
import { INITIAL_STATE } from './model';

const defaultHandler = () => ({ ...INITIAL_STATE });

const setSearchMode = (state) => ({ ...state, searchMode: true });

const setCreateMode = (state) => ({ ...state, createMode: true });

const createGroup = (state) => ({ ...state, loading: true });

const createGroupSuccess = (state) => ({ ...state, loading: false });

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
  createGroupSuccess: ['group'],
  onFailure: ['errors'],
});

export const HANDLERS = {
  [Types.SET_SEARCH_MODE]: setSearchMode,
  [Types.SET_CREATE_MODE]: setCreateMode,
  [Types.CREATE_GROUP]: createGroup,
  [Types.CREATE_GROUP_SUCCESS]: createGroupSuccess,
  [Types.ON_FAILURE]: onFailure,
  [ReduxSauceTypes.DEFAULT]: defaultHandler,
};

export default createReducer(INITIAL_STATE, HANDLERS);
