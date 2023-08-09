import axios from "axios";
const REACT_APP_API_URL = "http://localhost:5000/api/dev";

const AuthQuery = {
  loginUser: async (formData) => {
    const { data } = await axios.post(
      `${REACT_APP_API_URL}/auth/login`,
      formData
    );
    return await data;
  }
};

export default AuthQuery;
