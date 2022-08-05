import client from './client';

export const signup = payload => client.post('auth/signup', payload);
export const login = payload => client.post('auth/login', payload);
export const check = () => client.get('auth/check');
export const logout = () => client.get('auth/logout');
export const sendAuthEmail = payload => client.post('auth/send-auth-email', payload);
export const checkAuthEmail = payload => client.post('auth/check-auth-email', payload);
export const read = payload => {
  if (payload.type === 'id') {
    return client.get(`users/id/${payload.data}`);
  } else if (payload.type === 'nickname') {
    return client.get(`users/nickname/${payload.data}`);
  } else {
    return client.get(`users/email/${payload.data}`);
  }
};
export const update = payload => client.patch(`users/${payload.id}`, payload.data);
export const remove = payload => client.delete(`users/${payload}`);
export const checkPassword = payload => client.post(`users/${payload.id}/password-check`, payload.data);
export const changePassword = payload => client.patch(`users/${payload.id}/password`, payload.data);
