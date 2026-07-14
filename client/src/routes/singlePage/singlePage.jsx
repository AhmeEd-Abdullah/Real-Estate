import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useLoaderData, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequestConfig";
import { Posts } from "../../lib/api-endpoints";
import { useContext, useState } from "react";
import { authContext } from "../../context/authContext";

function SinglePage() {
    const post = useLoaderData();
    const [isSaved, setIsSaved] = useState(post.saved);
    const [isLoading, setIsLoading] = useState(false);
    const { currentUser } = useContext(authContext);
    const navigate = useNavigate();

    const postDetails = post.data?.postDetails ?? {};

    const toggleSavePlace = async () => {
        if (!currentUser) {
            navigate("/login");
            return;
        }
        setIsLoading(true);
        const savePlace = await apiRequest.post(
            `${Posts.postEndpoint}/${post.data.id}/save`,
        );
        setIsSaved(savePlace.data.saved);
        setIsLoading(false);
    };

    return (
        <div className="singlePage">
            <div className="details">
                <div className="wrapper">
                    <Slider images={post.data?.images ?? []} />
                    <div className="info">
                        <div className="top">
                            <div className="post">
                                <h1>{post.data?.title ?? "Property"}</h1>
                                <div className="address">
                                    <img src="/pin.png" alt="" />
                                    <span>
                                        {post.data?.address ??
                                            "Address unavailable"}
                                    </span>
                                </div>
                                <div className="price">
                                    $ {post.data?.price ?? 0}
                                </div>
                            </div>
                            <div className="user">
                                <img
                                    src={
                                        post.data?.user?.avatar || "/avatar.png"
                                    }
                                    alt=""
                                />
                                <span>
                                    {post.data?.user?.username ?? "Owner"}
                                </span>
                            </div>
                        </div>
                        <div className="bottom">
                            {postDetails?.description ??
                                "No description available."}
                        </div>
                    </div>
                </div>
            </div>
            <div className="features">
                <div className="wrapper">
                    <p className="title">General</p>
                    <div className="listVertical">
                        <div className="feature">
                            <img src="/utility.png" alt="" />
                            <div className="featureText">
                                <span>Utilities</span>
                                <p>
                                    {postDetails?.utilities === "owner"
                                        ? "Owner is responsible"
                                        : "Tenant is responsible"}
                                </p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="/pet.png" alt="" />
                            <div className="featureText">
                                <span>Pet Policy</span>
                                <p>
                                    {postDetails?.pet === "allowed"
                                        ? "Pets are allowed"
                                        : "Pets are not allowed"}
                                </p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="/fee.png" alt="" />
                            <div className="featureText">
                                <span>Income Plicy</span>
                                <p>{postDetails?.income ?? "No information"}</p>
                            </div>
                        </div>
                    </div>
                    <p className="title">Sizes</p>
                    <div className="sizes">
                        <div className="size">
                            <img src="/size.png" alt="" />
                            <span>{postDetails?.size ?? 0} sqft</span>
                        </div>
                        <div className="size">
                            <img src="/bed.png" alt="" />
                            <span>{post.data?.bedroom ?? 0} beds</span>
                        </div>
                        <div className="size">
                            <img src="/bath.png" alt="" />
                            <span>{post.data?.bathroom ?? 0} bathroom</span>
                        </div>
                    </div>
                    <p className="title">Nearby Places</p>
                    <div className="listHorizontal">
                        <div className="feature">
                            <img src="/school.png" alt="" />
                            <div className="featureText">
                                <span>School</span>
                                <p>
                                    {postDetails?.school > 999
                                        ? `${Math.round(postDetails?.school / 1000)}km`
                                        : `${postDetails?.school}m`}{" "}
                                    away
                                </p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="/pet.png" alt="" />
                            <div className="featureText">
                                <span>Bus Stop</span>
                                <p>{postDetails?.bus ?? 0}m away</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="/fee.png" alt="" />
                            <div className="featureText">
                                <span>Restaurant</span>
                                <p>{postDetails?.restaurant ?? 0}m away</p>
                            </div>
                        </div>
                    </div>
                    <p className="title">Location</p>
                    <div className="mapContainer">
                        <Map items={post.data ? [post.data] : []} />
                    </div>
                    <div className="buttons">
                        <button>
                            <img src="/chat.png" alt="" />
                            Send a Message
                        </button>
                        <button
                            className={isSaved ? "saved" : null}
                            onClick={toggleSavePlace}
                            disabled={isLoading}
                        >
                            <img src="/save.png" alt="" />
                            {isLoading ? (
                                "Loading..."
                            ) : (
                                <span>
                                    {isSaved ? "Place Saved" : "Save The Place"}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SinglePage;
