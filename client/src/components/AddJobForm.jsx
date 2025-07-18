import { useState } from "react";
import axios from "../utils/axios";

export default function AddJobForm({ onClose, onJobAdded, updateStats }) {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    status: "Applied",
    notes: "",
    appliedOn: new Date().toISOString().slice(0, 10), // defaults to today
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { company, position, location, appliedOn } = formData;
    if (!company || !position || !location || !appliedOn) {
      setError("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post("/jobs", formData);
      onJobAdded(); // refresh job list

      // NEW: fetch and update stats
      updateStats();

      onClose(); // close modal
    } catch (err) {
      console.error("Failed to add job:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add a New Job</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md outline-none"
            required
          />

          <input
            type="text"
            name="position"
            placeholder="Job Role"
            value={formData.position}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md outline-none"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md outline-none"
            required
          />

          <input
            type="date"
            name="appliedOn"
            value={formData.appliedOn}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md outline-none"
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md outline-none"
          >
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>

          <textarea
            name="notes"
            placeholder="Any notes..."
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md outline-none resize-none"
            rows={3}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md shadow"
            >
              {loading ? "Saving..." : "Add Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
