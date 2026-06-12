import { useState, useEffect } from "react";
import { createApplication, getApplications, deleteApplication, updateApplication } from "../services/UserService.js";

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    company_name: "",
    position: "",
    status: "applied",
    applied_at: "",
    application_link: ""
  });

  const fetchApplications = async (page = 1) => {
    setLoading(true);
    setError("");
    try {
      const response = await getApplications(page, 10);
      if (response.success) {
        setApplications(response.data);
        setTotalPages(response.totalPages);
        setCurrentPage(response.page);
      } else {
        setError(response.message || "Error fetching applications");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications(1);
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.company_name.trim() || !formData.position.trim()) {
      setError("Company name and position are required");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const applicationData = {
        ...formData,
        applied_at: formData.applied_at ? new Date(formData.applied_at).toISOString() : undefined
      };

      let response;
      if (editingId) {
        response = await updateApplication(editingId, applicationData);
        if (response.success) {
          setSuccess("Application updated successfully");
        } else {
          setError(response.message || "Error updating application");
        }
      } else {
        response = await createApplication(applicationData);
        if (response.success) {
          setSuccess("Application created successfully");
        } else {
          setError(response.message || "Error creating application");
        }
      }

      if (response.success) {
        setFormData({
          company_name: "",
          position: "",
          status: "applied",
          applied_at: "",
          application_link: ""
        });
        setEditingId(null);
        fetchApplications(currentPage);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error saving application");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (application) => {
    setFormData({
      company_name: application.company_name,
      position: application.position,
      status: application.status,
      applied_at: application.applied_at ? new Date(application.applied_at).toISOString().split('T')[0] : "",
      application_link: application.application_link || ""
    });
    setEditingId(application._id);
  };

  const handleCancelEdit = () => {
    setFormData({
      company_name: "",
      position: "",
      status: "applied",
      applied_at: "",
      application_link: ""
    });
    setEditingId(null);
  };

  const handleDelete = async (applicationId) => {
    if (!confirm("Are you sure you want to delete this application?")) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await deleteApplication(applicationId);
      if (response.success) {
        setSuccess("Application deleted successfully");
        fetchApplications(currentPage);
      } else {
        setError(response.message || "Error deleting application");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting application");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchApplications(page);
    }
  };

  return (
    <div className="flex">
      <div className="w-1/4 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">
          {editingId ? "Edit Application" : "Create Application"}
        </h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block mb-1">Company Name *</label>
            <input
              type="text"
              value={formData.company_name}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              className="w-full p-2 border"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Position *</label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full p-2 border"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full p-2 border"
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Applied Date</label>
            <input
              type="date"
              value={formData.applied_at}
              onChange={(e) => setFormData({ ...formData, applied_at: e.target.value })}
              className="w-full p-2 border"
            />
          </div>
          <div>
            <label className="block mb-1">Application Link</label>
            <input
              type="url"
              value={formData.application_link}
              onChange={(e) => setFormData({ ...formData, application_link: e.target.value })}
              className="w-full p-2 border"
              placeholder="https://"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 border"
          >
            {loading ? "Saving..." : (editingId ? "Update Application" : "Create Application")}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              disabled={loading}
              className="w-full p-2 border"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="w-3/4 p-4">
        <h2 className="text-xl font-bold mb-4">My Applications</h2>

        {error && (
          <div className="p-2 border mb-4">
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="p-2 border mb-4">
            <p>{success}</p>
          </div>
        )}

        {loading && applications.length === 0 ? (
          <p>Loading...</p>
        ) : applications.length === 0 ? (
          <p>No applications found</p>
        ) : (
          <>
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app._id} className="p-4 border">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{app.company_name}</h3>
                      <p>Position: {app.position}</p>
                      <p>Status: {app.status}</p>
                      {app.applied_at && (
                        <p>Applied: {new Date(app.applied_at).toLocaleDateString()}</p>
                      )}
                      {app.application_link && (
                        <p>
                          Link:{" "}
                          <a
                            href={app.application_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            {app.application_link}
                          </a>
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(app)}
                        disabled={loading}
                        className="p-2 border"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(app._id)}
                        disabled={loading}
                        className="p-2 border"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || loading}
                  className="p-2 border"
                >
                  Previous
                </button>
                <span className="p-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || loading}
                  className="p-2 border"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}