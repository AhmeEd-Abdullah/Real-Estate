import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequestConfig";
import { useState } from "react";
import { Auth } from "../../lib/api-endpoints";

function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const form = new FormData(e.target);
        const username = form.get("username")?.toString().trim();
        const email = form.get("email")?.toString().trim();
        const password = form.get("password")?.toString();

        if (!username || username.length < 3) {
            setError("Username must be at least 3 characters long");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (!password || password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);

        try {
            await apiRequest.post(Auth.registerEndpoint, {
                username,
                email,
                password,
            });
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Create an Account</h1>
                    <input
                        name="username"
                        required
                        minLength={3}
                        maxLength={20}
                        type="text"
                        placeholder="Username"
                    />
                    <input
                        name="email"
                        type="email"
                        required
                        maxLength={50}
                        placeholder="Email"
                    />
                    <input
                        name="password"
                        required
                        minLength={6}
                        maxLength={30}
                        type="password"
                        placeholder="Password"
                    />
                    <button disabled={isLoading}>
                        {isLoading ? "Loading..." : "Register"}
                    </button>
                    {error && <span>{error}</span>}
                    <Link to="/login">Do you have an account?</Link>
                </form>
            </div>
            <div className="imgContainer">
                <img src="/bg.png" alt="" />
            </div>
        </div>
    );
}

export default Register;
