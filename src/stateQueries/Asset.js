import axiosInstance from "./AxiosInstance";
const AssetQuery = {
  AssetManagement: {
    addDevice: async (formData) => {
      const resp = await axiosInstance.post(
        "/assetManagement/device",
        formData
      );
      return resp?.data;
    },
    editDevice: async (formData) => {
      const resp = await axiosInstance.put(
        `/assetManagement/device/${formData.deviceId}`,
        formData
      );
      return resp?.data;
    },
    getDevice: async (id) => {
      const resp = await axiosInstance.get(`/assetManagement/device/${id}`);
      return resp?.data;
    },
    deleteDevice: async (id) => {
      const resp = await axiosInstance.delete(`/assetManagement/device/${id}`);
      return resp?.data;
    },
    getAllDevices: async () => {
      const resp = await axiosInstance.get("/assetManagement/devices");
      return resp?.data;
    },

    addLicenseSubscription: async (formData) => {
      const resp = await axiosInstance.post(
        "assetManagement/licensesubscription",
        formData
      );
      return resp?.data;
    },

    editLicenseSubscription: async (formData) => {
      const resp = await axiosInstance.put(
        `/assetManagement/licensesubscription/${formData.licensesubscriptionId
        }`,
        formData
      );

      return resp?.data;
    },
    getLicenseSubscription: async (id) => {
      const resp = await axiosInstance.get(
        `/assetManagement/licensesubscription/${id}`
      );
      return resp?.data;
    },
    deleteLicenseSubscription: async (id) => {
      const resp = await axiosInstance.delete(
        `/assetManagement/licensesubscription/${id}`
      );
      return resp?.data;
    },
    getAllLicenseSubscription: async () => {
      const resp = await axiosInstance.get(
        "/assetManagement/licensesubscriptions"
      );
      return resp?.data;
    },

    addSimcards: async (formData) => {
      const resp = await axiosInstance.post(
        "/assetManagement/simcards",
        formData
      );
      return resp?.data;
    },
    editSimcards: async (formData) => {
      const resp = await axiosInstance.put(
        `/assetManagement/simcards/${formData.simcardsId}`,
        formData
      );
      return resp?.data;
    },
    getSimcards: async (id) => {
      const resp = await axiosInstance.get(`/assetManagement/simcards/${id}`);
      return resp?.data;
    },
    deleteSimcards: async (id) => {
      const resp = await axiosInstance.delete(
        `/assetManagement/simcards/${id}`
      );
      return resp?.data;
    },
    getAllSimcards: async () => {
      const resp = await axiosInstance.get("/assetManagement/simcards");
      return resp?.data;
    },
  },
};
export default AssetQuery;
