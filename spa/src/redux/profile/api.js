const baseUrl = 'http://localhost:44325/api';

export const profileApi = {
  fetchProfile: () => `${baseUrl}/profile`,
  updateProfile: () => `${baseUrl}/profile`,
  updateProfileImage: () => `${baseUrl}/profile/image`,
};
