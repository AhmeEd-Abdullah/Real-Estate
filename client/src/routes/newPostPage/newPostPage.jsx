import { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequestConfig";
import { Posts } from "../../lib/api-endpoints";
import UploadWidget from "../../components/upload-widget/UploadWidget";
import { useNavigate } from "react-router-dom";

function NewPostPage() {
    const [value, setValue] = useState("");
    const [images, setImages] = useState([]);
    const [isLoading, setIsloading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setIsloading(true);
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const plainDescription =
            new DOMParser()
                .parseFromString(value, "text/html")
                .documentElement.textContent?.trim() ?? "";

        try {
            const result = await apiRequest.post(Posts.postEndpoint, {
                postInfo: {
                    title: data.title,
                    price: parseInt(data.price),
                    images,
                    address: data.address,
                    city: data.city,
                    bedroom: parseInt(data.bedroom),
                    bathroom: parseInt(data.bathroom),
                    latitude: data.latitude,
                    longitude: data.longitude,
                    type: data.type,
                    property: data.property,
                },
                postDetails: {
                    description: plainDescription,
                    utilities: data.utilities,
                    pet: data.pet,
                    income: data.income,
                    size: parseInt(data.size),
                    school: parseInt(data.school),
                    bus: parseInt(data.bus),
                    restaurant: parseInt(data.restaurant),
                },
            });
            navigate(`/posts/${result.data.data.id}`);
        } catch (err) {
            console.log(err);
        } finally {
            setIsloading(false);
        }
    };

    return (
        <div className="newPostPage">
            <div className="formContainer">
                <h1>Add New Post</h1>
                <div className="wrapper">
                    <form onSubmit={handleSubmit}>
                        <div className="item">
                            <label htmlFor="title">Title</label>
                            <input id="title" name="title" type="text" />
                        </div>
                        <div className="item">
                            <label htmlFor="price">Price</label>
                            <input id="price" name="price" type="number" />
                        </div>
                        <div className="item">
                            <label htmlFor="address">Address</label>
                            <input id="address" name="address" type="text" />
                        </div>
                        <div className="item description">
                            <label htmlFor="desc">Description</label>
                            <ReactQuill
                                theme="snow"
                                value={value}
                                onChange={setValue}
                            />
                        </div>
                        <div className="item">
                            <label htmlFor="city">City</label>
                            <input id="city" name="city" type="text" />
                        </div>
                        <div className="item">
                            <label htmlFor="bedroom">Bedroom Number</label>
                            <input
                                min={1}
                                id="bedroom"
                                name="bedroom"
                                type="number"
                            />
                        </div>
                        <div className="item">
                            <label htmlFor="bathroom">Bathroom Number</label>
                            <input
                                min={1}
                                id="bathroom"
                                name="bathroom"
                                type="number"
                            />
                        </div>
                        <div className="item">
                            <label htmlFor="latitude">Latitude</label>
                            <input id="latitude" name="latitude" type="text" />
                        </div>
                        <div className="item">
                            <label htmlFor="longitude">Longitude</label>
                            <input
                                id="longitude"
                                name="longitude"
                                type="text"
                            />
                        </div>
                        <div className="item">
                            <label htmlFor="type">Type</label>
                            <select name="type">
                                <option value="rent" defaultChecked>
                                    Rent
                                </option>
                                <option value="buy">Buy</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="type">Property</label>
                            <select name="property">
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                                <option value="condo">Condo</option>
                                <option value="land">Land</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="utilities">Utilities Policy</label>
                            <select name="utilities">
                                <option value="owner">
                                    Owner is responsible
                                </option>
                                <option value="tenant">
                                    Tenant is responsible
                                </option>
                                <option value="shared">Shared</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="pet">Pet Policy</label>
                            <select name="pet">
                                <option value="allowed">Allowed</option>
                                <option value="not-allowed">Not Allowed</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="income">Income Policy</label>
                            <input
                                id="income"
                                name="income"
                                type="text"
                                placeholder="Income Policy"
                            />
                        </div>
                        <div className="item">
                            <label htmlFor="size">Total Size</label>
                            <input
                                min={0}
                                id="size"
                                name="size"
                                type="number"
                            />
                        </div>
                        <div className="item">
                            <label htmlFor="school">School</label>
                            <input
                                min={0}
                                id="school"
                                name="school"
                                type="number"
                            />
                        </div>
                        <div className="item">
                            <label htmlFor="bus">bus</label>
                            <input min={0} id="bus" name="bus" type="number" />
                        </div>
                        <div className="item">
                            <label htmlFor="restaurant">Restaurant</label>
                            <input
                                min={0}
                                id="restaurant"
                                name="restaurant"
                                type="number"
                            />
                        </div>
                        <button className="sendButton" disabled={isLoading}>
                            Add
                        </button>
                    </form>
                </div>
            </div>
            <div className="sideContainer">
                <div className="uploadPanel">
                    <h3>Property Images</h3>
                    <p>Add up to 4 images for your listing.</p>
                    <UploadWidget
                        uwConfig={{
                            multiple: true,
                            folder: "posts",
                        }}
                        value={images}
                        maxImages={4}
                        setState={setImages}
                    />
                </div>
            </div>
        </div>
    );
}

export default NewPostPage;
