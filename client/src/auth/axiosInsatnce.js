import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:3001/api'
});

//axiosInstance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export { axiosInstance }