import { call, put, takeEvery } from 'redux-saga/effects';
import { APIClient } from '../../helpers/apiClient';
import { getErrorMessagesArray } from '../../helpers/errorsUtils';
import { Creators, Types } from './duck';
import { groupsApi } from './api';
import { profileApi } from '../profile/api';
import { toastr } from 'react-redux-toastr';

export const getGroupsState = (state) => state.Groups;

const getRequest = new APIClient().get;
const postRequest = new APIClient().create;

export function* createGroup({ group }) {
  try {
    const profile = yield call(getRequest, profileApi.fetchProfile());

    const createGroupModel = {
      name: group.name,
      description: group.description,
      destination: group.destination,
      travelDate: group.travelDate,
      numberMaxOfMembers: group.numberMaxOfMembers,
      administrator: {
        name: profile.name,
        email: profile.user.email,
        picture: profile.picture,
      },
      picture: {
        imageName: group.imageName,
        imageBase64: group.imageBase64,
      },
    };

    const response = yield call(
      postRequest,
      groupsApi.create(),
      createGroupModel
    );

    if (response) {
      yield put(Creators.createGroupSuccess());
      toastr.success('Grupos', 'O Grupo foi criado com sucesso!');
    }
  } catch (error) {
    yield put(Creators.onFailure({ groups: getErrorMessagesArray(error) }));
  }
}

export function* searchGroup({ term }) {
  try {
    const response = yield call(getRequest, groupsApi.search(term));

    if (response) {
      yield put(Creators.searchGroupSuccess(response));
    }
  } catch (error) {
    yield put(Creators.onFailure({ groups: getErrorMessagesArray(error) }));
  }
}

function* groupsSaga() {
  yield takeEvery(Types.CREATE_GROUP, createGroup);
  yield takeEvery(Types.SEARCH_GROUP, searchGroup);
}

export default groupsSaga;
