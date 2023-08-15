import axiosInstance from "./AxiosInstance";

const AdminQuery = {
  addDepartment: async (formData) => {
    const resp = await axiosInstance.post("/admin/department", formData);

    return resp?.data;
  },
  getAllDepartments: async () => {
    const resp = await axiosInstance.get("/admin/departments");

    return resp?.data;
  }
};

export default AdminQuery;
