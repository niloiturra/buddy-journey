import {
  createActions,
  createReducer,
  Types as ReduxSauceTypes,
} from 'reduxsauce';
import { INITIAL_STATE } from './model';

const defaultHandler = () => ({ ...INITIAL_STATE });

const openTour = (state) => ({ ...state, isOpen: true });

const closeTour = (state) => ({ ...state, isOpen: false });

export const { Types, Creators } = createActions({
  openTour: [],
  closeTour: [],
});

export const HANDLERS = {
  [Types.OPEN_TOUR]: openTour,
  [Types.CLOSE_TOUR]: closeTour,
  [ReduxSauceTypes.DEFAULT]: defaultHandler,
};

export default createReducer(INITIAL_STATE, HANDLERS);
