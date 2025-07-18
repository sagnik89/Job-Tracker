import { useEffect, useState } from "react";
import axios from "../utils/axios";
import StatCard from "../components/StatCard";
import JobList from "../components/JobList";
import NotesPanel from "../components/NotesPanel";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalJobs: 0,
    statusBreakdown: {
      Applied: 0,
      Interviewing: 0,
      Offer: 0,
      Rejected: 0,
    },
  });

  useEffect(() => {
    axios
      .get("/jobs/stats")
      .then((res) => setStats(res.data))
      .catch((err) => {
        console.error("Failed to fetch stats:", err);
      });
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {/* stat cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        <StatCard title="Total Applied" value={stats.statusBreakdown.Applied} />
        <StatCard
          title="Interviews"
          value={stats.statusBreakdown.Interviewing}
        />
        <StatCard title="Offers" value={stats.statusBreakdown.Offer} />
      </div>

      {/* main grid: jobs list + notes */}
      <div className="grid lg:grid-cols-[1fr_350px] gap-6">
        <JobList setStats={setStats} />
        <NotesPanel />
      </div>
    </section>
  );
}
