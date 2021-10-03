import { createActions, createReducer } from 'reduxsauce';
import { INITIAL_STATE } from './model';

const setEditing = (state) => ({ ...state, editing: !state.editing });

const fetchProfile = (state) => ({ ...state, loading: true });

const fetchProfileSuccess = (state, { profile }) => ({ ...state, ...profile });

const updateProfile = (state) => ({ ...state, loading: true });

const updateProfileSuccess = (state) => ({
  ...state,
  editing: false,
});

const updateProfileImage = (state) => ({ ...state, loading: true });

const updateProfileImageSuccess = (state, { image }) => ({
  ...state,
  picture: image,
});

const onFailure = (state, { errors }) => ({
  ...state,
  loading: false,
  errors: {
    ...state.errors,
    ...errors,
  },
});

export const { Types, Creators } = createActions({
  setEditing: [],
  fetchProfile: [],
  fetchProfileSuccess: ['profile'],
  updateProfile: ['profile'],
  updateProfileSuccess: ['profile'],
  updateProfileImage: ['name', 'base64', 'uriImage'],
  updateProfileImageSuccess: ['image'],
  onFailure: ['errors'],
});

export const HANDLERS = {
  [Types.SET_EDITING]: setEditing,
  [Types.FETCH_PROFILE]: fetchProfile,
  [Types.FETCH_PROFILE_SUCCESS]: fetchProfileSuccess,
  [Types.UPDATE_PROFILE]: updateProfile,
  [Types.UPDATE_PROFILE_SUCCESS]: updateProfileSuccess,
  [Types.UPDATE_PROFILE_IMAGE]: updateProfileImage,
  [Types.UPDATE_PROFILE_IMAGE_SUCCESS]: updateProfileImageSuccess,
  [Types.ON_FAILURE]: onFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
