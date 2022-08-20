import client from './client';

export const getList = () => client.get('room/');
export const create = payload => client.post('room/', payload);
export const update = (code, payload) => client.post(`room/${code}/`, payload);
export const quickMatch = game => client.get(`room/quick_match/${game}`);
