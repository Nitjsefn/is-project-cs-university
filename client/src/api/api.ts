import axios from 'axios';

const API = axios.create({
  //baseURL: 'http://localhost:3000/api', // можно будет заменить на .env
    baseURL: "http://" + window.location.hostname + ":3000",
});

export const getZgloszenia = async () => API.get('/zgloszenia');
export const addZgloszenie = async (data: { name: string; description: string }) => API.post('/zgloszenia', data);
export const deleteZgloszenie = async (id: number) =>
  API.delete(`/zgloszenia/${id}`);

export function loginReq(data: {username: string, password: string}) {
    const res = API.post("/api/v1/auth/login", data);
    return res;
}

export function registerReq(data: {username: string, password: string}) {
    const res = API.post("/api/v1/auth/register", data);
    return res;
}

export function getLangs() {
    const res = API.get("api/v1/languages/");
    return res;
}

export function getCves() {
    const res = API.get("api/v1/vulnerabilities/");
    return res;
}
