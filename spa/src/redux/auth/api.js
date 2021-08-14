const baseUrl = 'https://localhost:5001/api';

export const authApi = {
  login: `${baseUrl}/identity/login`,
  register: `${baseUrl}/identity/register`,
  forgotPassword: `${baseUrl}/identity/forgot-password`,
  recoverPassword: `${baseUrl}/identity/recover-password`,
};
