import axios from 'axios';

const BASE_API_URL = process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_PROD_API_URL;

const instance = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

instance.interceptors.request.use(
    (config) => {
        try {
            const data = JSON.parse(localStorage.getItem('skyking-bank'));
            // data = { token: <string>, animTimestamp: <number> }
            const token = data?.token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
        } catch (err) {
            console.log('ERROR IN GETTING LOCALSTORAGE DATA', err);
        }
        return config;
    },
    (err) => {
        console.log('ERROR IN INTERCEPTOR', err);
        return new Promise.reject(err);
    }
);

export default instance;