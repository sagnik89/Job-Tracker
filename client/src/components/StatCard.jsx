export default function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#007cf0] to-[#005eff] p-6 text-white shadow-lg">
      <p className="text-sm opacity-80">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
