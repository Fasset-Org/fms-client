import axiosInstance from "./AxiosInstance";

const UserQuery = {
  SCMQuery: {
    addTender: async (formData) => {
      const resp = await axiosInstance.post("/scm/tender", formData);

      return resp?.data;
    },
    getAllCurrentTenders: async () => {
      const resp = await axiosInstance.get("/scm/currentTenders");

      return resp?.data;
    },
    getAllPreviousTenders: async () => {
      const resp = await axiosInstance.get("/scm/previousTenders");

      return resp?.data;
    },

    editTender: async (formData) => {
      const resp = await axiosInstance.put(
        `/scm/tender`,
        formData
      );

      return resp?.data;
    }
  },
  HumanResourceQuery: {}
};

export default UserQuery;
