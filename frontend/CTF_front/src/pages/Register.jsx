import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleRegister() {
        console.log(username);
        console.log(password);

        alert("Register success!");
        navigate("/login");
    }

    return (
        <div>

            <h1>Register</h1>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleRegister}>
                Register
            </button>

            <p>Already have an account?</p>

            <Link to="/login">
                <button>Login</button>
            </Link>

        </div>
    );
}