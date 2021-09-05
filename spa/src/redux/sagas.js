import { all } from 'redux-saga/effects';
import authSagas from './auth/sagas';
import profileSagas from './profile/sagas';
import groupsSaga from './groups/sagas';

export default function* rootSaga(getState) {
  yield all([authSagas(), profileSagas(), groupsSaga()]);
}
