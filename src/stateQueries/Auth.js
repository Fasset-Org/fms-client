import axios from "axios";
import axiosInstance from "./AxiosInstance";

const AuthQuery = {
  loginUser: async (formData) => {
    const resp = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      formData
    );
    return await resp?.data;
  },
  isUserLoggedIn: async (formData) => {
    const resp = await axiosInstance.get('/auth/isUserLoggedIn');
    return resp?.data;
  }
};

export default AuthQuery;
