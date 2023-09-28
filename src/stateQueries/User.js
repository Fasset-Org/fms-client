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
    getAllCancelledTenders: async () => {
      const resp = await axiosInstance.get("/scm/cancelledTenders");

      return resp?.data;
    },

    editTender: async (formData) => {
      const resp = await axiosInstance.put(`/scm/tender`, formData);

      return resp?.data;
    },

    markTenderAsPast: async (id) => {
      const resp = await axiosInstance.put(`/scm/markTenderAsPast/${id}`);

      return resp?.data;
    },
    markTenderAsCancelled: async (id) => {
      const resp = await axiosInstance.put(`/scm/markTenderAsCancelled/${id}`);

      return resp?.data;
    },
    markTenderAsActive: async (id) => {
      const resp = await axiosInstance.put(`/scm/markTenderAsActive/${id}`);

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
        `/humanResource/position/${formData.get("positionId")}`,
        formData
      );

      return resp?.data;
    },
    getPositionById: async (id) => {
      const resp = await axiosInstance.get(`/humanResource/position/${id}`);

      return resp?.data;
    },

    deletePositionById: async (id) => {
      const resp = await axiosInstance.delete(`/humanResource/position/${id}`);

      return resp?.data;
    },

    getAllPositions: async () => {
      const resp = await axiosInstance.get("/humanResource/positions");

      return resp?.data;
    },
    getAllPreviousPositions: async () => {
      const resp = await axiosInstance.get("/humanResource/previousPositions");

      return resp?.data;
    },
    addPositionQuestion: async (formData) => {
      const resp = await axiosInstance.post(
        "/humanResource/positionQuestion",
        formData
      );

      return resp?.data;
    },
    deletePositionQuestion: async (id) => {
      const resp = await axiosInstance.delete(
        `/humanResource/positionQuestion/${id}`
      );

      return resp?.data;
    },

    getPositionApplications: async (id) => {
      const resp = await axiosInstance.get(
        `/humanResource/jobApplication/${id}`
      );

      return resp?.data;
    },
    getApplicationById: async (positionId, id) => {
      const resp = await axiosInstance.get(
        `/humanResource/jobApplication/${positionId}/${id}`
      );

      return resp?.data;
    },
    shortlistApplication: async (formData) => {
      const resp = await axiosInstance.put(
        `/humanResource/jobApplication/${formData.positionId}/${formData.id}`
      );

      return resp?.data;
    },
    unSelectApplication: async (id) => {
      const resp = await axiosInstance.put(
        `/humanResource/unselectApplication/${id}`
      );

      return resp?.data;
    },
    rejectApplication: async (id) => {
      const resp = await axiosInstance.put(
        `/humanResource/rejectJobApplication/${id}`
      );

      return resp?.data;
    },
    rejectAllApplications: async (id) => {
      const resp = await axiosInstance.put(
        `/humanResource/rejectAllApplications/${id}`
      );

      return resp?.data;
    }
  }
};

export default UserQuery;
