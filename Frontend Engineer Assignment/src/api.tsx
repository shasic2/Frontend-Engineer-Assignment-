import axios, { AxiosInstance } from 'axios';

const API_KEY = "95aaa3e89b37291be20cedc9a877d2e8";
const BASE_URL = "https://api.themoviedb.org/3";

interface ApiConfig {
  params: {
    api_key: string;
  };
}

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY
  }
} as ApiConfig);

export default api;
