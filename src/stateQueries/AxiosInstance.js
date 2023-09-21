import axios from "axios";


const authToken = localStorage.getItem('authToken');

console.log(authToken)

const axiosInstance = axios.create({
  baseURL: "http://102.37.217.58:5000/api/dev",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${authToken}`
  }
})

export default axiosInstance;