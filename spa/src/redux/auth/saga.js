import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { APIClient } from '../../helpers/apiClient';
import { getErrorMessages } from '../../helpers/errorsUtils';

import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  FORGET_PASSWORD,
  RECOVER_PASSWORD,
} from './constants';

import {
  loginUserSuccess,
  registerUserSuccess,
  forgotPasswordSuccess,
  recoverPasswordSuccess,
} from './actions';

const create = new APIClient().create;

function* login({ payload: { username, password, history } }) {
  try {
    const response = yield call(create, '/identity/login', {
      email: username,
      password,
    });

    localStorage.setItem('authUser', JSON.stringify(response));
    yield put(loginUserSuccess(response));

    history.push('/dashboard');
  } catch (error) {
    getErrorMessages(error);
  }
}

function* logout({ payload: { history } }) {
  try {
    localStorage.removeItem('authUser');
    yield call(() => {
      history.push('/login');
    });
  } catch (error) {}
}

function* register({ payload: { user } }) {
  try {
    const email = user.email;
    const password = user.password;
    const confirmPassword = user.confirmPassword;

    const userModel = {
      email,
      password,
      confirmPassword,
    };

    const response = yield call(create, 'identity/register', userModel);

    localStorage.setItem('authUser', JSON.stringify(response));
    yield put(registerUserSuccess(response));
  } catch (error) {
    getErrorMessages(error);
  }
}

function* forgotPassword({ payload: { email } }) {
  try {
    yield call(create, '/identity/forgot-password', { email });
    yield put(forgotPasswordSuccess('Email enviado com sucesso'));
  } catch (error) {
    getErrorMessages(error);
  }
}

function* recoverPassword({ payload: { passwords } }) {
  try {
    const recoverBody = {
      emailEncoded: passwords.email,
      password: passwords.password,
      confirmPassword: passwords.confirmPassword,
      codeEncoded: passwords.code,
    };

    yield call(create, 'identity/recover-password', recoverBody);
    yield put(recoverPasswordSuccess('Senha alterada com sucesso!'));
  } catch (error) {
    getErrorMessages(error);
  }
}

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, login);
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}

export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, register);
}

export function* watchForgotPassword() {
  yield takeEvery(FORGET_PASSWORD, forgotPassword);
}

export function* watchRecoverPassword() {
  yield takeEvery(RECOVER_PASSWORD, recoverPassword);
}

function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchRecoverPassword),
  ]);
}

export default authSaga;
