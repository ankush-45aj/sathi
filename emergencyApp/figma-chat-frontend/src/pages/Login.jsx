import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import { motion } from "framer-motion";
import "./Login.css";
import boyImg from "./boy.png";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { loginUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post("/auth/login", { email, password });
            loginUser(res.data.user, res.data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials ❌");
        }
    };

    return (
        <div className="login-container">
            {/* Rope */}
            <motion.div
                className="rope"
                initial={{ height: 0 }}
                animate={{
                    height: 220,
                    rotate: [0, 2, -2, 3, 1],
                }}

                transition={{ duration: 1, ease: "easeOut" }}
            />

            {/* Boy */}
            <motion.img
                src={boyImg}
                alt="Boy pulling rope"
                className="boy"
                initial={{ y: -120, opacity: 1 }}
                animate={{
                    y: [-150, -20, 220, 600],
                    opacity: [1, 1, 1, 0],
                }}
                transition={{ duration: 3, ease: "easeInOut", times: [0, 0.25, 0.75, 1] }}
            />

            {/* Form group */}
            <motion.div
                className="pulled-group"
                initial={{ y: -400, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 2, ease: "easeOut" }}
            >
                <div className="hanger">
                    <span className="knot" />
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    {error && <p className="error-text">{error}</p>}
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
                    <button type="submit">Login</button>
                </form>
            </motion.div>
        </div>
    );
}

export default Login;
