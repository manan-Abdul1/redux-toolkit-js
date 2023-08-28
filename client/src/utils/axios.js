import axios from 'axios';
import { getToken } from './getAuthToken';
import { useNavigate } from 'react-router-dom';
//instances
// axios.defaults.baseURL = USER_BASE_URL;
// axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;

const urlInstance = axios.create({
    baseURL: "http://localhost:5500/"
})

//interceptors
axios.interceptors.request.use(req => {
    req.headers.Authorization = `Bearer ${getToken()}`;
    return req;
}, error => { return Promise.reject(error); });

axios.interceptors.response.use(response => {
    console.log(response, 'response');
    return response;
}, error => { return Promise.reject(error); });

// Set up interceptors for the url instance
urlInstance.interceptors.request.use(req => {
    req.headers.Authorization = `Bearer ${getToken()}`;
    return req;
}, error => { return Promise.reject(error); });

urlInstance.interceptors.response.use(
    responseInstance => {
        if (responseInstance.status === 401) {
            const navigate = useNavigate();
            navigate('/signin')
        }
        return responseInstance;
    }, error => { return Promise.reject(error); });

// a generic code to handle all api calls with ease
export const apiRequest = async (url, method, body) => {
    try {
        switch (method) {
            case 'get':
                return urlInstance.get(url);
            case 'delete':
                return urlInstance.delete(url);
            case 'post':
                return urlInstance.post(url, body);
            case 'patch':
                return urlInstance.patch(url, body);
            case 'put':
                return urlInstance.put(url, body);
            default:
                return urlInstance.get(url);
        }
    } catch (err) {
        return new Promise((resolve, reject) => {
            reject({ error: '' });
        });
    }
};