import { call, put, takeEvery } from 'redux-saga/effects';
import { APIClient } from '../../helpers/apiClient';
import { getErrorMessagesArray } from '../../helpers/errorsUtils';
import { Creators, Types } from './duck';
import { groupsApi } from '../groups/api';
import { chatGroupsApi } from './api';
import { HubConnectionBuilder } from '@microsoft/signalr';

export const getChatGroupsState = (state) => state.ChatGroups;

const getRequest = new APIClient().get;
const postRequest = new APIClient().create;

export function* onConnect() {
  try {
    const connection = new HubConnectionBuilder()
      .withUrl('http://localhost:5000/hubs/chat')
      .withAutomaticReconnect()
      .build();

    yield connection.start();
    yield put(Creators.onConnectSuccess(connection));
    yield handleConnection(connection);
    yield connectToAllGroups(connection);
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

function handleConnection(connection) {
  connection.on('ReceiveMessage', (message) => {
    console.log('Recebido: ', message);
  });
}

function* chatGroupsSagas() {
  yield takeEvery(Types.ON_CONNECT, onConnect);
}

export default chatGroupsSagas;
