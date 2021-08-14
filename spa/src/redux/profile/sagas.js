import { call, put, takeEvery, select } from 'redux-saga/effects';
import { APIClient } from '../../helpers/apiClient';
import { getErrorMessagesArray } from '../../helpers/errorsUtils';
import { Creators, Types } from './duck';
import { profileApi } from './api';

const get = new APIClient().get;

export const getAuthState = (state) => state.Auth;

function* fetchProfile() {
  try {
    const {
      user: {
        userToken: { id },
      },
    } = yield select(getAuthState);

    const response = yield call(get, profileApi.fetchProfile(id));
    yield put(Creators.fetchProfileSuccess(response));
  } catch (error) {
    yield put(Creators.onFailure({ profile: getErrorMessagesArray(error) }));
  }
}

function* authSaga() {
  yield takeEvery(Types.FETCH_PROFILE, fetchProfile);
}

export default authSaga;
