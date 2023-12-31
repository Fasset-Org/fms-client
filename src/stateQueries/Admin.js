import axiosInstance from "./AxiosInstance";

const AdminQuery = {
  addDepartment: async (formData) => {
    const resp = await axiosInstance.post("/admin/department", formData);

    return resp?.data;
  },
  getAllDepartments: async () => {
    const resp = await axiosInstance.get("/admin/departments");

    return resp?.data;
  },

  addModule: async (formData) => {
    const resp = await axiosInstance.post("/admin/module", formData);

    return resp?.data;
  },

  getAllModules: async () => {
    const resp = await axiosInstance.get("/admin/modules");

    return resp?.data;
  },

  addUser: async (formData) => {
    console.log(formData);
    const resp = await axiosInstance.post("/auth/addUser", formData);

    return resp?.data;
  },
  getAllUsers: async () => {
    const resp = await axiosInstance.get("/admin/users");

    return resp?.data;
  }
};

export default AdminQuery;
