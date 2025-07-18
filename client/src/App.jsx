import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import SharedLayout from "./layout/SharedLayout";
import Login from "./pages/Login";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<SharedLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
