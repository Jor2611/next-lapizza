import axios from 'axios';

export const axiosInsance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})