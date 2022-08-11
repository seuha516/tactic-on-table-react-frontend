import client from './client';

export const signup = payload => client.post('account/signup/', payload);
export const login = payload => client.post('account/login/', payload);
export const check = () => client.get('account/check/');
export const logout = () => client.get('account/logout/');

export const read = username => client.get(`account/user/?username=${username}`);
export const update = payload => client.patch(`account/user/`, payload);
export const remove = payload => client.post(`account/user/`, payload);

export const getRecord = page => client.get(`account/record/?page=${page}`);
export const getRanking = page => client.get(`account/ranking/?page=${page}`);
