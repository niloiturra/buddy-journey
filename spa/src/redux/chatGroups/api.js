const baseUrl = 'http://localhost:5000';

export const chatGroupsApi = {
  connectUrl: () => `${baseUrl}/hubs/chat`,
  joinToGroup: () => `${baseUrl}/chat/join/group`,
  messagesFromGroup: (groupName) =>
    `${baseUrl}/chat/messages?groupId=${groupName}`,
};
