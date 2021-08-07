import { getLoggedInUser } from '../../helpers/authUtils';

export const INITIAL_STATE = {
  user: getLoggedInUser(),
  loading: false,
};
