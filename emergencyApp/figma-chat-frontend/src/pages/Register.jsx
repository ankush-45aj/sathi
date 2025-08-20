import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import "./Register.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post("/auth/register", {
                name,
                email,
                password,
            });
            console.log("Registered:", res.data);
        } catch (err) {
            setError("Server error ❌");
            console.error(err.response?.data || err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
