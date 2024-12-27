import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://violet-meerkat-830212.hostingersite.com/public/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axiosInstance;
