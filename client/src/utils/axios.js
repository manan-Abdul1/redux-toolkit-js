import axios from 'axios';
import { getToken } from './getAuthToken';
const headers = {
    headers: {
        Authorization: `Bearer ${getToken}`
    }
}

// a generic code to handle all api calls with ease
export const apiRequest = async (url, method, body) => {
    try {
        switch (method) {
            case 'get':
                return axios.get(url, { ...headers });
            case 'delete':
                return axios.delete(url,{ ...headers });
            case 'post':
                return axios.post(url, body, { ...headers });
            case 'patch':
                return axios.patch(url, body, { ...headers });
            case 'put':
                return axios.put(url, body, { ...headers });
            default:
                return axios.get(url, { ...headers });
        }
    } catch (err) {
        return new Promise((resolve, reject) => {
            reject({ error: '' });
        });
    }
};