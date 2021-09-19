const baseUrl = 'http://localhost:44391/api';

export const groupsApi = {
  search: (term) => `${baseUrl}/groups/search?term=${term}`,
  create: () => `${baseUrl}/groups`,
  associateUser: (groupId) =>
    `${baseUrl}/groups/associate/user?groupId=${groupId}`,
  getAllByName: () => `${baseUrl}/groups/user/names`,
};
