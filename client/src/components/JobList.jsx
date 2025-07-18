import { useState, useEffect } from "react";
import axios from "../utils/axios";
import AddJobForm from "./AddJobForm";
import EditJobForm from "./EditJobForm";

export default function JobList({ setStats }) {
  const [jobs, setJobs] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [jobBeingEdited, setJobBeingEdited] = useState(null);


  const fetchJobs = async () => {
    try {
      const res = await axios.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get("/jobs/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/jobs/${id}`);
      fetchJobs();
      fetchStats();
    } catch (err) {
      console.error("Failed to delete job:", err);
      alert("Failed to delete job. Please try again.");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const statusColorMap = {
    Applied: "bg-blue-300",
    Interviewing: "bg-yellow-300",
    Offer: "bg-green-300",
    Rejected: "bg-red-300",
  };

  function getStatusIcon(status) {
    switch (status) {
      case "Applied":
        return "A";
      case "Interviewing":
        return "I";
      case "Offer":
        return "O";
      case "Rejected":
        return "R";
      default:
        return "?";
    }
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Company"
          className="flex-1 rounded-md bg-gray-100 px-4 py-2 outline-none"
        />
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-[#007cf0] to-[#005eff] text-white font-semibold px-4 py-2 rounded-md shadow"
        >
          ADD JOB
        </button>
      </div>

      <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="flex items-center justify-between bg-gradient-to-r from-white to-[#e8f1ff] p-4 rounded-md"
          >
            {/* Left: Company and Date */}
            <div>
              <p className="font-bold text-lg text-[#1e3a8a]">{job.company}</p>
              <p className="text-sm text-gray-500">
                Applied On: {formatDate(job.appliedOn)}
              </p>
            </div>

            {/* Center: Role, Status, Location */}
            <div className="flex flex-col items-center gap-1 text-center">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-[#111827]">{job.position}</p>
                <span
                  className={`w-6 h-6 flex items-center justify-center rounded-full border border-black font-bold text-sm ${
                    statusColorMap[job.status] || "bg-gray-300"
                  }`}
                >
                  {getStatusIcon(job.status)}
                </span>
              </div>
              <p className="text-sm text-gray-600">{job.location}</p>
            </div>

            {/* Right: Edit + Delete Buttons */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setJobBeingEdited(job)}
                className="bg-gradient-to-r from-[#007cf0] to-[#005eff] text-white px-4 py-2 rounded-md shadow"
              >
                EDIT
              </button>
              <button
                title="Delete"
                onClick={() => handleDelete(job._id)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-md shadow flex items-center justify-center w-9"
              >
                <img
                  src="/images/delete-job.svg"
                  alt="Delete"
                  className="w-5 h-5"
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Job Modal */}
      {showAddForm && (
        <AddJobForm
          onClose={() => setShowAddForm(false)}
          onJobAdded={fetchJobs}
          updateStats={fetchStats}
        />
      )}
      
      {jobBeingEdited && (
        <EditJobForm
          job={jobBeingEdited}
          onClose={() => setJobBeingEdited(null)}
          onJobUpdated={fetchJobs}
          updateStats={fetchStats}
        />
      )}
    </div>
  );
}
