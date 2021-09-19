import { call, put, takeEvery } from 'redux-saga/effects';
import { APIClient } from '../../helpers/apiClient';
import { getErrorMessagesArray } from '../../helpers/errorsUtils';
import { Creators, Types } from './duck';
import { groupsApi } from './api';

export const getChatsState = (state) => state.Chats;

const getRequest = new APIClient().get;

export function* getGroupsByUser() {
  try {
    const response = yield call(getRequest, groupsApi.getByUser());

    if (response) {
      yield put(Creators.getGroupsByUserSuccess(response));
    }
  } catch (error) {
    yield put(Creators.onFailure({ groups: getErrorMessagesArray(error) }));
  }
}

function* chatsSaga() {
  yield takeEvery(Types.GET_GROUPS_BY_USER, getGroupsByUser);
}

export default chatsSaga;
