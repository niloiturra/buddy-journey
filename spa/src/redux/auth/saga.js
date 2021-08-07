import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { APIClient } from '../../helpers/apiClient';
import { getErrorMessages } from '../../helpers/errorsUtils';
import { Creators, Types } from './duck';

const create = new APIClient().create;

function* login({ email, password, history }) {
  try {
    const response = yield call(create, '/identity/login', {
      email,
      password,
    });

    localStorage.setItem('authUser', JSON.stringify(response));
    yield put(Creators.loginSuccess(response));

    history.push('/dashboard');
  } catch (error) {
    getErrorMessages(error);
  }
}

function* logout({ history }) {
  try {
    localStorage.removeItem('authUser');
    yield call(() => {
      history.push('/login');
    });
  } catch (error) {}
}

function* register({ user }) {
  try {
    const email = user.email;
    const name = user.name;
    const password = user.password;
    const confirmPassword = user.confirmPassword;

    const userModel = {
      email,
      name,
      password,
      confirmPassword,
    };

    const response = yield call(create, 'identity/register', userModel);

    localStorage.setItem('authUser', JSON.stringify(response));
    yield put(Creators.registerSuccess(response));
  } catch (error) {
    getErrorMessages(error);
  }
}

function* forgotPassword({ email }) {
  try {
    yield call(create, '/identity/forgot-password', { email });
    yield put(Creators.forgotPasswordSuccess('Email enviado com sucesso'));
  } catch (error) {
    getErrorMessages(error);
  }
}

function* recoverPassword({ passwords }) {
  try {
    const recoverBody = {
      emailEncoded: passwords.email,
      password: passwords.password,
      confirmPassword: passwords.confirmPassword,
      codeEncoded: passwords.code,
    };

    yield call(create, 'identity/recover-password', recoverBody);
    yield put(Creators.recoverPasswordSuccess('Senha alterada com sucesso!'));
  } catch (error) {
    getErrorMessages(error);
  }
}

export function* watchLogin() {
  yield takeEvery(Types.LOGIN, login);
}

export function* watchLogout() {
  yield takeEvery(Types.LOGOUT, logout);
}

export function* watchRegister() {
  yield takeEvery(Types.REGISTER, register);
}

export function* watchForgotPassword() {
  yield takeEvery(Types.FORGOT_PASSWORD, forgotPassword);
}

export function* watchRecoverPassword() {
  yield takeEvery(Types.RECOVER_PASSWORD, recoverPassword);
}

function* authSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchRegister),
    fork(watchForgotPassword),
    fork(watchRecoverPassword),
  ]);
}

export default authSaga;
