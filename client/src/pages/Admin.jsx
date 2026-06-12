import { useState } from "react";
import { getUser, deleteUser } from "../services/AdminService.js";

export default function Admin() {
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSearch = async () => {
    if (!userId.trim()) {
      setError("Please enter a user ID");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    setUserData(null);

    try {
      const response = await getUser(userId);
      if (response.success) {
        setUserData(response.data);
      } else {
        setError(response.message || "User not found");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching user");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!userData) return;

    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await deleteUser(userData._id);
      if (response.success) {
        setSuccess("User deleted successfully");
        setUserData(null);
        setUserId("");
      } else {
        setError(response.message || "Error deleting user");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user ID"
            className="p-2 border flex-1"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="p-2 border"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

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

      {userData && (
        <div className="p-4 border">
          <h2 className="text-xl font-bold mb-2">User Details</h2>
          <div className="space-y-2">
            <p><strong>ID:</strong> {userData._id}</p>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Role:</strong> {userData.role}</p>
          </div>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="p-2 border mt-4"
          >
            {loading ? "Deleting..." : "Delete User"}
          </button>
        </div>
      )}
    </div>
  );
}