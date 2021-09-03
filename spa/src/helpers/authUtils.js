import jwtDecode from 'jwt-decode';

const isUserAuthenticated = () => {
  const user = getLoggedInUser();
  if (!user) {
    return false;
  }

  try {
    const decoded = jwtDecode(user.token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn('access token expired');
      return false;
    } else {
      return true;
    }
  } catch (e) {
    console.warn('access token expired');
    return false;
  }
};

const setLoggedInUser = (user) => {
  localStorage.setItem('authUser', JSON.stringify(user));
};

const getUserAccessToken = () => {
  const user = JSON.parse(localStorage.getItem('authUser'));
  return user ? user.accessToken : '';
};

const getLoggedInUser = () => {
  const user = localStorage.getItem('authUser');
  return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
};

export {
  isUserAuthenticated,
  setLoggedInUser,
  getLoggedInUser,
  getUserAccessToken,
};
