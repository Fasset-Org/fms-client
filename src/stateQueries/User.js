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
      const resp = await axiosInstance.put(`/scm/tender`, formData);

      return resp?.data;
    }
  },
  HumanResourceQuery: {
    addQualification: async (formData) => {
      const resp = await axiosInstance.post(
        "humanResource/qualification",
        formData
      );

      return resp?.data;
    },

    getAllQualification: async () => {
      const resp = await axiosInstance.get("/humanResource/qualifications");

      return resp?.data;
    },

    addPosition: async (formData) => {
      const resp = await axiosInstance.post(
        "/humanResource/position",
        formData
      );

      return resp?.data;
    },
    editPosition: async (formData) => {
      const resp = await axiosInstance.put(
        `/humanResource/position/${formData.positionId}`
      );

      return resp?.data;
    },
    getPositionById: async (id) => {
      const resp = await axiosInstance.get(`/humanResource/position/${id}`);

      return resp?.data;
    },

    getAllPositions: async () => {
      const resp = await axiosInstance.get("/humanResource/positions");

      return resp?.data;
    },
    addPositionQuestion: async (formData) => {
      const resp = await axiosInstance.post(
        "/humanResource/positionQuestion",
        formData
      );

      return resp?.data;
    }
  }
};

export default UserQuery;
