import { call, put, takeLatest } from 'redux-saga/effects';
import { APIClient } from '../../helpers/apiClient';
import { getErrorMessagesArray } from '../../helpers/errorsUtils';
import { Creators, Types } from './duck';
import { groupsApi } from './api';

const getRequest = new APIClient().get;

export function* getGroupsByUser() {
  try {
    const response = yield call(getRequest, groupsApi.getByUser());

    if (response) {
      yield put(Creators.getGroupsByUserSuccess(response));
    }
  } catch (error) {
    yield put(Creators.onFailure({ chats: getErrorMessagesArray(error) }));
  }
}

function* chatsSaga() {
  yield takeLatest(Types.GET_GROUPS_BY_USER, getGroupsByUser);
}

export default chatsSaga;
