import { useEffect, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";

function Map({ items }) {
    const mapRef = useRef(null);

    useEffect(() => {
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };
    }, []);

    return (
        <MapContainer
            ref={mapRef}
            center={
                items.length === 1
                    ? [items[0].latitude, items[0].longitude]
                    : [30.0444, 31.2357]
            }
            zoom={items.length === 1 ? 13 : 4}
            scrollWheelZoom={false}
            className="map"
            key={items.map((item) => item.id).join("-")}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {items.map((item) => (
                <Pin item={item} key={item.id} />
            ))}
        </MapContainer>
    );
}

export default Map;
