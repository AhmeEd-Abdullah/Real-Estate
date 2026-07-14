import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { Await } from "react-router";
import { Suspense, useContext } from "react";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequestConfig";
import LoaderIndicator from "../../components/loaderIndicator/LoaderIndicator";
import "./profilePage.scss";
import { authContext } from "../../context/authContext";
import { Auth } from "../../lib/api-endpoints";

function ProfilePage() {
    const { posts } = useLoaderData();

    const { currentUser, updateCurrentUser } = useContext(authContext);
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await apiRequest.post(Auth.logoutEndpoint);
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
                        <Link to="/posts/add">
                            <button>Create New Post</button>
                        </Link>
                    </div>
                    <Suspense
                        fallback={
                            <LoaderIndicator text="Loading my posts..." />
                        }
                    >
                        <Await resolve={posts}>
                            {(profileResponse) =>
                                profileResponse?.data?.data?.myPosts.length ? (
                                    <List
                                        posts={
                                            profileResponse?.data?.data
                                                ?.myPosts || []
                                        }
                                    />
                                ) : (
                                    <p style={{ fontSize: "20px" }}>
                                        No Properties Added Yet.
                                    </p>
                                )
                            }
                        </Await>
                    </Suspense>
                    <div className="title">
                        <h1>Saved List</h1>
                    </div>
                    <Suspense
                        fallback={
                            <LoaderIndicator text="Loading saved posts..." />
                        }
                    >
                        <Await resolve={posts}>
                            {(profileResponse) =>
                                profileResponse?.data?.data?.savedPosts
                                    .length ? (
                                    <List
                                        posts={
                                            profileResponse?.data?.data
                                                ?.savedPosts || []
                                        }
                                    />
                                ) : (
                                    <p style={{ fontSize: "20px" }}>
                                        No Properties Saved Yet.
                                    </p>
                                )
                            }
                        </Await>
                    </Suspense>
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
