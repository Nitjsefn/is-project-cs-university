import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api', // можно будет заменить на .env
});

export const getZgloszenia = async () => API.get('/zgloszenia');
export const addZgloszenie = async (data: { name: string; description: string }) => API.post('/zgloszenia', data);
export const deleteZgloszenie = async (id: number) =>
  API.delete(`/zgloszenia/${id}`);