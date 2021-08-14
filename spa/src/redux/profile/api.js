const baseUrl = 'https://localhost:5002/api';

export const profileApi = {
  fetchProfile: (id) => `${baseUrl}/profile?userId=${id}`,
};
