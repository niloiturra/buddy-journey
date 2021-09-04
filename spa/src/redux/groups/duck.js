import {
  createActions,
  createReducer,
  Types as ReduxSauceTypes,
} from 'reduxsauce';
import { INITIAL_STATE } from './model';

const defaultHandler = () => ({ ...INITIAL_STATE });

const setSearchMode = (state) => ({ ...state, searchMode: true });

export const { Types, Creators } = createActions({
  setSearchMode: [],
});

export const HANDLERS = {
  [Types.SET_SEARCH_MODE]: setSearchMode,
  [ReduxSauceTypes.DEFAULT]: defaultHandler,
};

export default createReducer(INITIAL_STATE, HANDLERS);
