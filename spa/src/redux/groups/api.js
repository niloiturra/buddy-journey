const baseUrl = 'http://localhost:44391/api';

export const groupsApi = {
  search: (term) => `${baseUrl}/groups/search?term=${term}`,
  create: () => `${baseUrl}/groups`,
  associateUser: (groupId) =>
    `${baseUrl}/groups/associate/user?groupId=${groupId}`,
  disassociateUser: (groupId, userId) =>
    `${baseUrl}/groups/disassociate/user?groupId=${groupId}&userId=${userId}`,
  getAllByName: () => `${baseUrl}/groups/user/names`,
  update: () => `${baseUrl}/groups`,
  updateGroupImage: (groupId) => `${baseUrl}/groups/image?groupId=${groupId}`,
  deleteGroup: (groupId) => `${baseUrl}/groups?groupId=${groupId}`,
};
