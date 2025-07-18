export default function NavBar() {
  return (
    <header className="w-full bg-gradient-to-r from-[#007cf0] to-[#00dfd8] p-4 rounded-b-3xl flex items-center justify-between">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
        Job Tracker
      </h1>

      <div className="space-x-3">
        <button className="rounded-md bg-white/20 hover:bg-white/30 text-white font-semibold px-5 py-2 backdrop-blur-sm transition">
          Resume
        </button>
        <button className="rounded-md bg-white/20 hover:bg-white/30 text-white font-semibold px-5 py-2 backdrop-blur-sm transition">
          Profile
        </button>
      </div>
    </header>
  );
}
