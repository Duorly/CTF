import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/register";
import CreatePoll from "./pages/CreatePoll";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create-poll" element={<CreatePoll />} />
    </Routes>
  );
}