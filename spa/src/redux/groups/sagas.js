import { call, put, takeLatest } from 'redux-saga/effects';
import { APIClient } from '../../helpers/apiClient';
import { getErrorMessagesArray } from '../../helpers/errorsUtils';
import { Creators, Types } from './duck';
import { groupsApi } from './api';
import { profileApi } from '../profile/api';
import { toastr } from 'react-redux-toastr';

const getRequest = new APIClient().get;
const postRequest = new APIClient().create;
const putRequest = new APIClient().put;
const deleteRequest = new APIClient().delete;

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
      toastr.success('Grupo', `Você criou o grupo ${group.name}`);
      yield put(Creators.createGroupSuccess());
      window.location.reload();
    }
  } catch (error) {
    toastr.error('Grupo', `Ocorreu um erro ao criar o grupo: ${group.name}`);
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

export function* associateUser({ groupId }) {
  try {
    const profile = yield call(getRequest, profileApi.fetchProfile());

    const associateUserModel = {
      name: profile.name,
      email: profile.user.email,
      picture: profile.picture,
    };

    const response = yield call(
      postRequest,
      groupsApi.associateUser(groupId),
      associateUserModel
    );

    if (response) {
      yield put(Creators.associateUserSuccess());
      toastr.success('Grupo', `Você ingressou no grupo com sucesso!`);
      window.location.reload();
    }
  } catch (error) {
    toastr.error('Grupo', `Ocorreu um erro ao entrar no grupo`);
    yield put(Creators.onFailure({ groups: getErrorMessagesArray(error) }));
  }
}

export function* disassociateUser({ groupId, userId }) {
  try {
    yield call(putRequest, groupsApi.disassociateUser(groupId, userId));

    yield put(Creators.disassociateUserSuccess());
    toastr.success('Grupo', `Usuário desassociado com sucesso!`);

    window.location.reload();
  } catch (error) {
    toastr.error('Grupo', `Ocorreu um erro ao desassociar o usuário do grupo`);
    yield put(Creators.onFailure({ groups: getErrorMessagesArray(error) }));
  }
}

export function* deleteGroup({ groupId }) {
  try {
    yield call(deleteRequest, groupsApi.deleteGroup(groupId));

    toastr.success('Grupo', `Desfeito com sucesso!`);
    window.location.reload();
  } catch (error) {
    toastr.error('Grupo', `Ocorreu um erro ao desfazer o grupo`);
    yield put(Creators.onFailure({ groups: getErrorMessagesArray(error) }));
  }
}

function* groupsSaga() {
  yield takeLatest(Types.CREATE_GROUP, createGroup);
  yield takeLatest(Types.SEARCH_GROUP, searchGroup);
  yield takeLatest(Types.ASSOCIATE_USER, associateUser);
  yield takeLatest(Types.DISASSOCIATE_USER, disassociateUser);
  yield takeLatest(Types.DELETE_GROUP, deleteGroup);
}

export default groupsSaga;
