import { combineReducers } from 'redux';

import Auth from './auth/duck';
import Profile from './profile/duck';
import Chat from './chat/reducers';
import Layout from './layout/reducer';
import Tour from './tour/duck';
import { reducer as ToastrReducer } from 'react-redux-toastr';

export default combineReducers({
  Auth,
  Profile,
  Chat,
  Layout,
  toastr: ToastrReducer,
  Tour,
});
