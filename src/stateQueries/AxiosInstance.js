import axios from "axios";


const authToken = localStorage.getItem('authToken');

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${authToken}`
  }
})

export default axiosInstance;