import { combineReducers } from 'redux';

import Auth from './auth/duck';
import Profile from './profile/duck';
import Chats from './chats/duck';
import Layout from './layout/duck';
import Tour from './tour/duck';
import Groups from './groups/duck';
import ChatGroups from './chatGroups/duck';
import { reducer as ToastrReducer } from 'react-redux-toastr';

export default combineReducers({
  Auth,
  Profile,
  Chats,
  Layout,
  toastr: ToastrReducer,
  Tour,
  Groups,
  ChatGroups,
});
