import { call, put, takeLatest } from 'redux-saga/effects';
import { APIClient } from '../../helpers/apiClient';
import { getErrorMessagesArray } from '../../helpers/errorsUtils';
import { Creators, Types } from './duck';
import { groupsApi } from '../groups/api';
import { chatGroupsApi } from './api';
import { HubConnectionBuilder } from '@microsoft/signalr';

export const getChatGroupsState = (state) => state.ChatGroups;

const getRequest = new APIClient().get;
const postRequest = new APIClient().create;
const putRequest = new APIClient().put;

export function* onConnect() {
  try {
    const conn = new HubConnectionBuilder()
      .withUrl('http://localhost:5000/hubs/chat')
      .build();

    yield conn.start();
    yield put(Creators.onConnectSuccess(conn));
    yield connectToAllGroups(conn);
  } catch (error) {
    yield put(Creators.onFailure({ chatGroups: getErrorMessagesArray(error) }));
  }
}

export function* connectToAllGroups(connection) {
  try {
    const response = yield call(getRequest, groupsApi.getAllByName());

    if (response) {
      for (var groupName of response) {
        yield joinToGroup(groupName, connection);
      }
    }
  } catch (error) {
    yield put(Creators.onFailure({ chatGroups: getErrorMessagesArray(error) }));
  }
}

export function* joinToGroup(groupName, connection) {
  try {
    const joinToGroupModel = {
      groupName: groupName,
      connectionId: connection.connection.connectionId,
    };

    yield call(postRequest, chatGroupsApi.joinToGroup(), joinToGroupModel);
  } catch (error) {
    yield put(Creators.onFailure({ chatGroups: getErrorMessagesArray(error) }));
  }
}

export function* messagesFromGroup({ group }) {
  try {
    const response = yield call(
      getRequest,
      chatGroupsApi.messagesFromGroup(group.id)
    );

    if (response) {
      yield put(Creators.messagesFromGroupSuccess(response, group));
    }
  } catch (error) {
    yield put(Creators.onFailure({ chatGroups: getErrorMessagesArray(error) }));
  }
}

export function* dispatchMessage({ messageValues }) {
  try {
    yield call(postRequest, chatGroupsApi.sendMessage(), messageValues);
  } catch (error) {
    yield put(Creators.onFailure({ chatGroups: getErrorMessagesArray(error) }));
  }
}

export function* updateGroup({ group }) {
  try {
    yield call(putRequest, groupsApi.update(), group);

    yield put(Creators.updateGroupSuccess(group));
    window.location.reload();
  } catch (error) {
    yield put(Creators.onFailure({ chatGroups: getErrorMessagesArray(error) }));
  }
}

export function* updateGroupImage({ name, base64, uriImage, groupId }) {
  try {
    const imageModel = {
      imageName: name,
      imageBase64: base64,
      uriImage,
    };

    const response = yield call(
      putRequest,
      groupsApi.updateGroupImage(groupId),
      imageModel
    );

    if (response) {
      yield put(Creators.updateGroupImageSuccess(response));
    }
  } catch (error) {
    yield put(Creators.onFailure({ chatGroups: getErrorMessagesArray(error) }));
  }
}

function* chatGroupsSagas() {
  yield takeLatest(Types.ON_CONNECT, onConnect);
  yield takeLatest(Types.MESSAGES_FROM_GROUP, messagesFromGroup);
  yield takeLatest(Types.DISPATCH_MESSAGE, dispatchMessage);
  yield takeLatest(Types.UPDATE_GROUP, updateGroup);
  yield takeLatest(Types.UPDATE_GROUP_IMAGE, updateGroupImage);
}

export default chatGroupsSagas;
