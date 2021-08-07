import {
  createActions,
  createReducer,
  Types as ReduxSauceTypes,
} from 'reduxsauce';
import { INITIAL_STATE } from './model';

const defaultHandler = () => ({ ...INITIAL_STATE });

const login = (state) => ({ ...state, loading: true });

const loginSuccess = (state, { user }) => ({
  ...state,
  user,
  loading: false,
  errors: null,
});

const register = (state) => ({ ...state, loading: true });

const registerSuccess = (state, { user }) => ({
  ...state,
  user,
  loading: false,
  errors: null,
});

const forgotPassword = (state) => ({ ...state, loading: true });

const forgotPasswordSuccess = (state, { passwordResetStatus }) => ({
  ...state,
  passwordResetStatus,
  loading: false,
  errors: null,
});

const recoverPassword = (state) => ({ ...state, loading: true });

const recoverPasswordSuccess = (state, { passwordRecoverStatus }) => ({
  ...state,
  passwordRecoverStatus,
  loading: false,
  errors: null,
});

const onFailure = (state, { errors }) => ({
  ...state,
  loading: false,
  errors: {
    ...state.errors,
    ...errors,
  },
});

const logout = (state) => ({ ...state, user: null });

export const { Types, Creators } = createActions({
  login: ['email', 'password', 'history'],
  loginSuccess: ['user'],
  register: ['user'],
  registerSuccess: ['user'],
  forgotPassword: [],
  forgotPasswordSuccess: ['passwordResetStatus'],
  recoverPassword: [],
  recoverPasswordSuccess: ['passwordRecoverStatus'],
  onFailure: ['errors'],
  logout: ['history'],
});

export const HANDLERS = {
  [Types.LOGIN]: login,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.REGISTER]: register,
  [Types.REGISTER_SUCCESS]: registerSuccess,
  [Types.FORGOT_PASSWORD]: forgotPassword,
  [Types.FORGOT_PASSWORD_SUCCESS]: forgotPasswordSuccess,
  [Types.RECOVER_PASSWORD]: recoverPassword,
  [Types.RECOVER_PASSWORD_SUCCESS]: recoverPasswordSuccess,
  [Types.LOGOUT]: logout,
  [Types.ON_FAILURE]: onFailure,
  [ReduxSauceTypes.DEFAULT]: defaultHandler,
};

export default createReducer(INITIAL_STATE, HANDLERS);
