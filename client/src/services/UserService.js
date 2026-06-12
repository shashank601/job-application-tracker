import api from "./Axios.js";

export const createApplication = async (applicationData) => {
    const response = await api.post('/applications', applicationData);
    return response.data;
}

export const getApplications = async (page = 1, limit = 10) => {
    const response = await api.get('/applications', {
        params: {
            page,
            limit       
        }
    });
    return response.data;
}

export const updateApplication = async (applicationId, applicationData) => {
    const response = await api.patch(`/applications/${applicationId}`, applicationData);
    return response.data;
}

export const deleteApplication = async (applicationId) => {
    const response = await api.delete(`/applications/${applicationId}`);
    return response.data;
}

