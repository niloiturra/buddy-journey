import {
  createActions,
  createReducer,
  Types as ReduxSauceTypes,
} from 'reduxsauce';
import { INITIAL_STATE } from './model';

const defaultHandler = () => ({ ...INITIAL_STATE });

const fetchProfile = (state) => ({ ...state, loading: true });

const fetchProfileSuccess = (state, { profile }) => ({ ...state, ...profile });

const onFailure = (state, { errors }) => ({
  ...state,
  loading: false,
  errors: {
    ...state.errors,
    ...errors,
  },
});

export const { Types, Creators } = createActions({
  fetchProfile: [],
  fetchProfileSuccess: ['profile'],
  onFailure: ['errors'],
});

export const HANDLERS = {
  [Types.FETCH_PROFILE]: fetchProfile,
  [Types.FETCH_PROFILE_SUCCESS]: fetchProfileSuccess,
  [Types.ON_FAILURE]: onFailure,
  [ReduxSauceTypes.DEFAULT]: defaultHandler,
};

export default createReducer(INITIAL_STATE, HANDLERS);
