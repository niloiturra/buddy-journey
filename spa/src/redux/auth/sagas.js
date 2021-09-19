import { call, put, takeLatest } from 'redux-saga/effects';
import { APIClient } from '../../helpers/apiClient';
import { getErrorMessagesArray } from '../../helpers/errorsUtils';
import { Creators, Types } from './duck';
import { authApi } from './api';

const create = new APIClient().create;

function* login({ email, password, history }) {
  try {
    const response = yield call(create, authApi.login, {
      email,
      password,
    });

    localStorage.setItem('authUser', JSON.stringify(response));
    yield put(Creators.loginSuccess(response));

    history.push('/dashboard');
  } catch (error) {
    yield put(Creators.onFailure({ login: getErrorMessagesArray(error) }));
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

    const response = yield call(create, authApi.register, userModel);

    localStorage.setItem('authUser', JSON.stringify(response));
    yield put(Creators.registerSuccess(response));
  } catch (error) {
    yield put(Creators.onFailure({ register: getErrorMessagesArray(error) }));
  }
}

function* forgotPassword({ email }) {
  try {
    yield call(create, authApi.forgotPassword, { email });
    yield put(Creators.forgotPasswordSuccess('Email enviado com sucesso'));
  } catch (error) {
    yield put(
      Creators.onFailure({ forgotPassword: getErrorMessagesArray(error) })
    );
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

    yield call(create, authApi.recoverPassword, recoverBody);
    yield put(Creators.recoverPasswordSuccess('Senha alterada com sucesso!'));
  } catch (error) {
    yield put(
      Creators.onFailure({ recoverPassword: getErrorMessagesArray(error) })
    );
  }
}

function* authSaga() {
  yield takeLatest(Types.LOGIN, login);
  yield takeLatest(Types.LOGOUT, logout);
  yield takeLatest(Types.REGISTER, register);
  yield takeLatest(Types.FORGOT_PASSWORD, forgotPassword);
  yield takeLatest(Types.RECOVER_PASSWORD, recoverPassword);
}

export default authSaga;
