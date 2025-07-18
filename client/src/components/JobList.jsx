import { useState, useEffect } from "react";
import axios from "../utils/axios";

export default function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // TODO: replace mock fetch with real API
    axios.get("/jobs").then((res) => setJobs(res.data));
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
        <button className="bg-gradient-to-r from-[#007cf0] to-[#005eff] text-white font-semibold px-4 py-2 rounded-md shadow">
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
                <p className="font-bold text-lg text-[#1e3a8a]">
                  {job.company}
                </p>
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

              {/* Right: Edit Button */}
              <button className="bg-gradient-to-r from-[#007cf0] to-[#005eff] text-white px-4 py-2 rounded-md shadow">
                EDIT
              </button>
            </div>
          
        ))}
      </div>
    </div>
  );
}
