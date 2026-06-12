import api from "./Axios.js";

export const getUser = async (userId) => {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data;
}

export const deleteUser = async (userId) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
}