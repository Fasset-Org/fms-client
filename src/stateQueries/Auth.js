import axios from "axios";
import axiosInstance from "./AxiosInstance";
axios.defaults.baseURL = "http://102.37.217.58:5000/api/dev";
// axios.defaults.baseURL="http://localhost:8001/api/dev"
const AuthQuery = {
  loginUser: async (formData) => {
    const resp = await axios.post(`/auth/login`, formData);
    return await resp?.data;
  },
  isUserLoggedIn: async (formData) => {
    const resp = await axiosInstance.get("/auth/isUserLoggedIn");
    return resp?.data;
  },

  verifyResetToken: async (formData) => {
    const resp = await axios.post(`/auth/verifyResetToken`, formData);

    return resp?.data;
  },
  resetUserPassword: async (formData) => {
    const resp = await axiosInstance.post(
      `/auth/resetPassword/${formData.resetToken}`,
      formData
    );

    return resp?.data;
  }
};

export default AuthQuery;
