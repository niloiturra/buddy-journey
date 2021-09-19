import {
  createActions,
  createReducer,
  Types as ReduxSauceTypes,
} from 'reduxsauce';
import { INITIAL_STATE } from './model';

const defaultHandler = () => ({ ...INITIAL_STATE });

const getGroupsByUser = (state) => ({ ...state, loading: true });

const getGroupsByUserSuccess = (state, { groups }) => ({
  ...state,
  groups,
  loading: false,
});

const onFailure = (state, { errors }) => ({
  ...state,
  loading: false,
  errors: {
    ...state.errors,
    ...errors,
  },
});

export const { Types, Creators } = createActions({
  getGroupsByUser: [],
  getGroupsByUserSuccess: ['groups'],
  onFailure: ['errors'],
});

export const HANDLERS = {
  [Types.GET_GROUPS_BY_USER]: getGroupsByUser,
  [Types.GET_GROUPS_BY_USER_SUCCESS]: getGroupsByUserSuccess,
  [Types.ON_FAILURE]: onFailure,
  [ReduxSauceTypes.DEFAULT]: defaultHandler,
};

export default createReducer(INITIAL_STATE, HANDLERS);
