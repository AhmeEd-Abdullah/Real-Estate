import { Link, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequestConfig";
import "./profilePage.scss";
import { useContext } from "react";
import { authContext } from "../../context/authContext";
import { Auth } from "../../lib/api-endpoints";

function ProfilePage() {
    const { currentUser, updateCurrentUser } = useContext(authContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        try {
            apiRequest.post(Auth.logoutEndpoint);
            updateCurrentUser(null);
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };

    return currentUser ? (
        <div className="profilePage">
            <div className="details">
                <div className="wrapper">
                    <div className="title">
                        <h1>User Information</h1>
                        <Link to="/profile/update">
                            <button>Update Profile</button>
                        </Link>
                    </div>
                    <div className="info">
                        <span>
                            Avatar:
                            <img
                                src={currentUser?.avatar || "/no-avatar.png"}
                                alt="User Image"
                            />
                        </span>
                        <span>
                            Username: <b>{currentUser?.username || ""}</b>
                        </span>
                        <span>
                            E-mail: <b>{currentUser?.email || ""}</b>
                        </span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                    <div className="title">
                        <h1>My List</h1>
                        <button>Create New Post</button>
                    </div>
                    <List />
                    <div className="title">
                        <h1>Saved List</h1>
                    </div>
                    <List />
                </div>
            </div>
            <div className="chatContainer">
                <div className="wrapper">
                    <Chat />
                </div>
            </div>
        </div>
    ) : null;
}

export default ProfilePage;
