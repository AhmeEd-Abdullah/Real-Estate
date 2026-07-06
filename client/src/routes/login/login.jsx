import { useContext, useState } from "react";
import apiRequest from "../../lib/apiRequestConfig";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../context/authContext";
import { Auth } from "../../lib/api-endpoints";

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { updateCurrentUser } = useContext(authContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const form = new FormData(e.target);
        const email = form.get("email");
        const password = form.get("password");

        try {
            const response = await apiRequest.post(Auth.loginEndpoint, {
                email,
                password,
            });
            updateCurrentUser(response?.data.data);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login">
            <div className="formContainer">
                <form onSubmit={handleSubmit}>
                    <h1>Welcome back</h1>
                    <input name="email" type="email" placeholder="Email" />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                    <button disabled={isLoading}>
                        {isLoading ? "Loading..." : "Login"}
                    </button>
                    {error && <span>{error}</span>}
                    <Link to="/register">{"Don't"} you have an account?</Link>
                </form>
            </div>
            <div className="imgContainer">
                <img src="/bg.png" alt="" />
            </div>
        </div>
    );
}

export default Login;
