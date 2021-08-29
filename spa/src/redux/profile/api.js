const baseUrl = 'https://localhost:5002/api';

export const profileApi = {
  fetchProfile: () => `${baseUrl}/profile`,
  updateProfile: () => `${baseUrl}/profile`,
  updateProfileImage: () => `${baseUrl}/profile/image`,
};
