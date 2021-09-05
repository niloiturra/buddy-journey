const baseUrl = 'http://localhost:44357/api';

export const authApi = {
  login: `${baseUrl}/identity/login`,
  register: `${baseUrl}/identity/register`,
  forgotPassword: `${baseUrl}/identity/forgot-password`,
  recoverPassword: `${baseUrl}/identity/recover-password`,
};
