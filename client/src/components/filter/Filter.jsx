import { useState } from "react";
import "./filter.scss";
import { useNavigate, useSearchParams } from "react-router-dom";

function Filter() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState({
        location: searchParams.get("location") || "",
        type: searchParams.get("type") || "",
        property: searchParams.get("property") || "",
        minPrice: searchParams.get("minPrice") || "",
        maxPrice: searchParams.get("maxPrice") || "",
        bedroom: searchParams.get("bedroom") || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setQuery((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearch = () => {
        const nextParams = new URLSearchParams();

        if (query.location) nextParams.set("location", query.location);
        if (query.type) nextParams.set("type", query.type);
        if (query.property) nextParams.set("property", query.property);
        if (query.minPrice) nextParams.set("minPrice", query.minPrice);
        if (query.maxPrice) nextParams.set("maxPrice", query.maxPrice);
        if (query.bedroom) nextParams.set("bedroom", query.bedroom);

        const nextQuery = nextParams.toString();
        const currentQueryString = new URLSearchParams(
            searchParams.toString(),
        ).toString();

        if (nextQuery !== currentQueryString) {
            navigate(`/list${nextQuery ? `?${nextQuery}` : ""}`);
        }
    };

    return (
        <div className="filter">
            <h1>
                Search results for{" "}
                <b>{query.location.toUpperCase() || "All Locations"}</b>
            </h1>
            <div className="top">
                <div className="item">
                    <label htmlFor="city">Location</label>
                    <input
                        type="text"
                        id="city"
                        name="location"
                        placeholder="City"
                        value={query.location}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="bottom">
                <div className="item">
                    <label htmlFor="type">Type</label>
                    <select
                        name="type"
                        id="type"
                        value={query.type}
                        onChange={handleChange}
                    >
                        <option value="">any</option>
                        <option value="buy">Buy</option>
                        <option value="rent">Rent</option>
                    </select>
                </div>
                <div className="item">
                    <label htmlFor="property">Property</label>
                    <select
                        name="property"
                        id="property"
                        value={query.property}
                        onChange={handleChange}
                    >
                        <option value="">any</option>
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="condo">Condo</option>
                        <option value="land">Land</option>
                    </select>
                </div>
                <div className="item">
                    <label htmlFor="minPrice">Min Price</label>
                    <input
                        type="number"
                        id="minPrice"
                        name="minPrice"
                        placeholder="any"
                        value={query.minPrice}
                        onChange={handleChange}
                    />
                </div>
                <div className="item">
                    <label htmlFor="maxPrice">Max Price</label>
                    <input
                        type="number"
                        id="maxPrice"
                        name="maxPrice"
                        placeholder="any"
                        value={query.maxPrice}
                        onChange={handleChange}
                    />
                </div>
                <div className="item">
                    <label htmlFor="bedroom">Bedroom</label>
                    <input
                        type="number"
                        id="bedroom"
                        name="bedroom"
                        placeholder="any"
                        value={query.bedroom}
                        onChange={handleChange}
                    />
                </div>
                <button type="button" onClick={handleSearch}>
                    <img src="/search.png" alt="" />
                </button>
            </div>
        </div>
    );
}

export default Filter;
