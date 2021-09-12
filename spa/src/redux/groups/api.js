const baseUrl = 'http://localhost:44391/api';

export const groupsApi = {
  search: (term) => `${baseUrl}/groups/search?term=${term}`,
  create: () => `${baseUrl}/groups`,
};
