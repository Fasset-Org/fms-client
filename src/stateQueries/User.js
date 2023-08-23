import axiosInstance from "./AxiosInstance";

const UserQuery = {
  SCMQuery: {
    addTender: async (formData) => {
      const resp = await axiosInstance.post("/scm/tender", formData);

      return resp?.data;
    }
  },
  HumanResourceQuery: {}
};

export default UserQuery;
