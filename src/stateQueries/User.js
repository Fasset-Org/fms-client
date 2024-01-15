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
  },
  CSEQuery: {
    addDocumentTitle: async (formData) => {
      const resp = await axiosInstance.post(`/cse/downloadsTitle`, formData);

      return resp?.data;
    },
    editDocumentTitle: async (formData) => {
      const resp = await axiosInstance.put(
        `/cse/downloadsTitle/${formData.downloadsTitleId}`,
        formData
      );

      return resp?.data;
    },
    getDocumentTitleById: async (id) => {
      const resp = await axiosInstance.get(`/cse/documentTitle/${id}`);

      return resp?.data;
    },
    getlAllDOcumentsTitle: async () => {
      const resp = await axiosInstance.get(`/cse/downloadsTitle`);

      return resp?.data;
    },
    addDocument: async (formData) => {
      const resp = await axiosInstance.post(`/cse/addDocument`, formData);

      return resp?.data;
    },
    getAllDocuments: async () => {
      const resp = await axiosInstance.get(`/cse/documents`);

      return resp?.data;
    },
    deleteDocument: async (id) => {
      const resp = await axiosInstance.delete(`/cse/deleteDocument/${id}`);

      return resp?.data;
    },

    addGeneralNotice: async (formData) => {
      const resp = await axiosInstance.post(`/cse/generalNotice`, formData);

      return resp?.data;
    },

    editGeneralNotice: async (formData) => {
      console.log(formData);
      const resp = await axiosInstance.put(
        `/cse/generalNotice/${formData.generalNoticeId}`,
        formData
      );

      return resp?.data;
    },
    deleteGeneralNotice: async (id) => {
      const resp = await axiosInstance.delete(`/cse/generalNotice/${id}`);

      return resp?.data;
    },

    getAllGeneralNotices: async () => {
      const resp = await axiosInstance.get("/cse/generalNotices");

      return resp?.data;
    },

    addGrantWindow: async (formData) => {
      const resp = await axiosInstance.post(`/cse/grantWindow`, formData);

      return resp?.data;
    },

    editGrantWindow: async (formData) => {
      const resp = await axiosInstance.put(
        `/cse/grantWindow/${formData.grantId}`,
        formData
      );

      return resp?.data;
    },
    deleteGrantWindow: async (id) => {
      const resp = await axiosInstance.delete(`/cse/grantWindow/${id}`);

      return resp?.data;
    },
    getAllGrantsWindows: async () => {
      const resp = await axiosInstance.get("/cse/grantWindows");

      return resp?.data;
    },

    addBannerImageFile: async (formData) => {
      const resp = await axiosInstance.post("/cse/banner", formData);

      return resp?.data;
    },

    getAllBannerImages: async () => {
      const resp = await axiosInstance.get("/cse/banners");

      return resp?.data;
    },

    deleteBannerImageFile: async (id) => {
      const resp = await axiosInstance.delete(`/cse/banner/${id}`);

      return resp?.data;
    },
    addBoardMember: async (formData) => {
      const resp = await axiosInstance.post("/cse/boardMember", formData);

      return resp?.data;
    },
    editBoardMember: async (formData) => {
      const resp = await axiosInstance.put(`/cse/boardMember`, formData);

      return resp?.data;
    },

    getAllBoardMembers: async () => {
      const resp = await axiosInstance.get("/cse/boardMembers");

      return resp?.data;
    },

    deleteBoardMember: async (id) => {
      const resp = await axiosInstance.delete(`/cse/boardMember/${id}`);

      return resp?.data;
    },

    addCommitteeMember: async (formData) => {
      const resp = await axiosInstance.post("/cse/committeeMember", formData);

      return resp?.data;
    },
    editCommitteeMember: async (formData) => {
      const resp = await axiosInstance.put(`/cse/committeeMember`, formData);

      return resp?.data;
    },

    getAllCommitteeMembers: async () => {
      const resp = await axiosInstance.get("/cse/committeeMembers");

      return resp?.data;
    },

    deleteCommitteeMember: async (id) => {
      const resp = await axiosInstance.delete(`/cse/committeeMember/${id}`);

      return resp?.data;
    },

    addAnnualReport: async (formData) => {
      const resp = await axiosInstance.post("/cse/annualReport", formData);

      return resp?.data;
    },

    editAnnualReport: async (formData) => {
      const resp = await axiosInstance.put(`/cse/annualReport`, formData);

      return resp?.data;
    },

    getAllAnnualeports: async () => {
      const resp = await axiosInstance.get("/cse/annualReports");

      return resp?.data;
    },

    deleteAnnualReport: async (id) => {
      const resp = await axiosInstance.delete(`/cse/annualReport/${id}`);

      return resp?.data;
    },

    addResearchReport: async (formData) => {
      const resp = await axiosInstance.post("/cse/researchReport", formData);

      return resp?.data;
    },

    editResearchReport: async (formData) => {
      const resp = await axiosInstance.put(`/cse/researchReport`, formData);

      return resp?.data;
    },

    getAllResearcheports: async () => {
      const resp = await axiosInstance.get("/cse/researchReport");

      return resp?.data;
    },

    deleteResearchReport: async (id) => {
      const resp = await axiosInstance.delete(`/cse/researchReport/${id}`);

      return resp?.data;
    }
  }
};

export default UserQuery;
