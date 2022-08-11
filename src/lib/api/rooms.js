import client from './client';

export const getList = () => client.get('room/');
export const create = payload => client.post('room/', payload);
export const update = (roomId, payload) => client.post(`room/${roomId}/`, payload);
