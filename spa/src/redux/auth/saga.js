import { call, put, takeEvery } from 'redux-saga/effects';
import { APIClient } from '../../helpers/apiClient';
import { getErrorMessagesArray } from '../../helpers/errorsUtils';
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

    const response = yield call(create, 'identity/register', userModel);

    localStorage.setItem('authUser', JSON.stringify(response));
    yield put(Creators.registerSuccess(response));
  } catch (error) {
    yield put(Creators.onFailure({ register: getErrorMessagesArray(error) }));
  }
}

function* forgotPassword({ email }) {
  try {
    yield call(create, '/identity/forgot-password', { email });
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

    yield call(create, 'identity/recover-password', recoverBody);
    yield put(Creators.recoverPasswordSuccess('Senha alterada com sucesso!'));
  } catch (error) {
    yield put(
      Creators.onFailure({ recoverPassword: getErrorMessagesArray(error) })
    );
  }
}

function* authSaga() {
  yield takeEvery(Types.LOGIN, login);
  yield takeEvery(Types.LOGOUT, logout);
  yield takeEvery(Types.REGISTER, register);
  yield takeEvery(Types.FORGOT_PASSWORD, forgotPassword);
  yield takeEvery(Types.RECOVER_PASSWORD, recoverPassword);
}

export default authSaga;
