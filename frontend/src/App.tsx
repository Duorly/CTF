import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePoll from "./pages/CreatePoll";
import PollView from "./pages/PollView";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create-poll" element={<CreatePoll />} />
      <Route path="/poll/:id" element={<PollView />} />
    </Routes>
  );
}