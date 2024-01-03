import axios from "axios";
const BASE_URL = "http://0.0.0.0:3000";

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-type": "application/json",
    },
});

export const axiosFile = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-type": "multipart/form-data",
    },
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: true,
});
