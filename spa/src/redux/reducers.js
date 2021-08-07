import { combineReducers } from 'redux';

import Auth from './auth/duck';
import Chat from './chat/reducers';
import Layout from './layout/reducer';
import { reducer as ToastrReducer } from 'react-redux-toastr';

export default combineReducers({
  Auth,
  Chat,
  Layout,
  toastr: ToastrReducer,
});
