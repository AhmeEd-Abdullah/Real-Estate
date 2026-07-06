import "./profileUpdatePage.scss";
import { useContext, useState } from "react";
import { authContext } from "../../context/authContext";
import apiRequest from "../../lib/apiRequestConfig";
import { Users } from "../../lib/api-endpoints";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/upload-widget/uploadWidget";

function ProfileUpdatePage() {
    const { currentUser, updateCurrentUser } = useContext(authContext);
    const curruntUserData = {
        username: currentUser?.username || "",
        email: currentUser?.email || "",
        avatar: currentUser?.avatar || "",
    };

    const [formData, setFormData] = useState(curruntUserData);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const validateField = (name, value) => {
        if (name === "username" && value.trim().length < 3) {
            return "Enter a valid username.";
        }

        if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return "Enter a valid email.";
        }

        if (name === "password" && value && value.trim().length < 6) {
            return "6 characters at least.";
        }

        return "";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);
    };

    const updateData = async (e) => {
        e.preventDefault();

        const newErrors = {};
        Object.entries(formData).forEach(([name, value]) => {
            const errorMessage = validateField(name, value);
            if (errorMessage) {
                newErrors[name] = errorMessage;
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        let requestBody = {};

        for (const key of Object.keys(formData)) {
            if (formData[key] && formData[key] !== curruntUserData[key]) {
                requestBody[key] = formData[key];
            }
        }

        if (Object.keys(requestBody).length) {
            setIsLoading(true);
            try {
                const res = await apiRequest.put(
                    Users.updateEndpoint,
                    requestBody,
                );
                console.log(res);

                updateCurrentUser(res.data.data);
                navigate("/profile");
            } catch (err) {
                setErrors({
                    global: err?.response?.data?.message || "Update failed",
                });
            } finally {
                setIsLoading(false);
            }
        } else {
            setErrors({ global: "No Data Changed" });
        }
    };

    return (
        <div className="profileUpdatePage">
            <div className="formContainer">
                <form onSubmit={updateData}>
                    <h1>Update Profile</h1>
                    <div className="item">
                        {errors.global && (
                            <span className="error global">
                                {errors.global}
                            </span>
                        )}
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {errors.username && (
                            <span className="error">{errors.username}</span>
                        )}
                    </div>
                    <div className="item">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && (
                            <span className="error">{errors.email}</span>
                        )}
                    </div>
                    <div className="item">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value=""
                            onChange={handleChange}
                        />
                        {errors.password && (
                            <span className="error">{errors.password}</span>
                        )}
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Updating..." : "Update"}
                    </button>
                </form>
            </div>
            <div className="sideContainer">
                <img
                    src={formData.avatar || "/no-avatar.png"}
                    alt="User Picture"
                    className="avatar"
                />
                <UploadWidget isLoading={isLoading} setFormData={setFormData} />
            </div>
        </div>
    );
}

export default ProfileUpdatePage;
