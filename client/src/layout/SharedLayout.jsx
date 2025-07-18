import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

export default function SharedLayout() {
  return (
    <>
      <NavBar /> {/* new header */}
      <main className="min-h-screen bg-gradient-to-b from-[#f0f7ff] to-white">
        <Outlet />
      </main>
    </>
  );
}
