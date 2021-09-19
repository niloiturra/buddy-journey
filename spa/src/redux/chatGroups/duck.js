import {
  createActions,
  createReducer,
  Types as ReduxSauceTypes,
} from 'reduxsauce';
import { INITIAL_STATE } from './model';

const defaultHandler = () => ({ ...INITIAL_STATE });

const onConnectSuccess = (state, { connection }) => ({ ...state, connection });

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
  onConnectSuccess: ['connection'],
  onFailure: ['errors'],
});

export const HANDLERS = {
  [Types.ON_CONNECT_SUCCESS]: onConnectSuccess,
  [Types.ON_FAILURE]: onFailure,
  [ReduxSauceTypes.DEFAULT]: defaultHandler,
};

export default createReducer(INITIAL_STATE, HANDLERS);
