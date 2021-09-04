import {
  createActions,
  createReducer,
  Types as ReduxSauceTypes,
} from 'reduxsauce';
import { INITIAL_STATE } from './model';

const defaultHandler = () => ({ ...INITIAL_STATE });

const setSearchMode = (state) => ({ ...state, searchMode: true });

const setCreateMode = (state) => ({ ...state, createMode: true });

export const { Types, Creators } = createActions({
  setSearchMode: [],
  setCreateMode: [],
});

export const HANDLERS = {
  [Types.SET_SEARCH_MODE]: setSearchMode,
  [Types.SET_CREATE_MODE]: setCreateMode,
  [ReduxSauceTypes.DEFAULT]: defaultHandler,
};

export default createReducer(INITIAL_STATE, HANDLERS);
