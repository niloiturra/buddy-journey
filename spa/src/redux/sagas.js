import { all } from 'redux-saga/effects';
import authSagas from './auth/sagas';
import profileSagas from './profile/sagas';
import groupsSaga from './groups/sagas';
import chatsSaga from './chats/sagas';
import chatGroupsSagas from './chatGroups/sagas';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    profileSagas(),
    groupsSaga(),
    chatsSaga(),
    chatGroupsSagas(),
  ]);
}
