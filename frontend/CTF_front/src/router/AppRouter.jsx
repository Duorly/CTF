import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateVote from "../pages/CreateVote";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/createvote" element={<CreateVote />} />
        </Routes>
    );
}