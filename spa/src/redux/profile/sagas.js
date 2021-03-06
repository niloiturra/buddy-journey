import { call, put, takeLatest } from 'redux-saga/effects';
import { APIClient } from '../../helpers/apiClient';
import { getErrorMessagesArray } from '../../helpers/errorsUtils';
import { Creators, Types } from './duck';
import { profileApi } from './api';

const getRequest = new APIClient().get;
const putRequest = new APIClient().put;

export const getAuthState = (state) => state.Auth;

export function* fetchProfile() {
  try {
    const response = yield call(getRequest, profileApi.fetchProfile());
    yield put(Creators.fetchProfileSuccess(response));
  } catch (error) {
    yield put(Creators.onFailure({ profile: getErrorMessagesArray(error) }));
  }
}

export function* updateProfile({ profile }) {
  try {
    const response = yield call(
      putRequest,
      profileApi.updateProfile(),
      profile
    );

    if (response) {
      yield put(Creators.fetchProfile());
      yield put(Creators.updateProfileSuccess());
    }
  } catch (error) {
    yield put(Creators.onFailure({ profile: getErrorMessagesArray(error) }));
  }
}

export function* updateProfileImage({ name, base64, uriImage }) {
  try {
    const imageModel = {
      imageName: name,
      imageBase64: base64,
      uriImage,
    };

    const response = yield call(
      putRequest,
      profileApi.updateProfileImage(),
      imageModel
    );

    if (response) {
      yield put(Creators.updateProfileImageSuccess(response));
    }
  } catch (error) {
    yield put(Creators.onFailure({ profile: getErrorMessagesArray(error) }));
  }
}

function* profileSaga() {
  yield takeLatest(Types.FETCH_PROFILE, fetchProfile);
  yield takeLatest(Types.UPDATE_PROFILE, updateProfile);
  yield takeLatest(Types.UPDATE_PROFILE_IMAGE, updateProfileImage);
}

export default profileSaga;
