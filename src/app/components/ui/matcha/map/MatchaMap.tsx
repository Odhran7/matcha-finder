"use client";

import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { usePlaces } from "./hooks/usePlaces";
import { Icon } from "leaflet";
import useMapInstance from "./hooks/useMapInstance";

const MatchaMap = () => {
  const places = usePlaces();
  const mapInstanceRef = useMapInstance();


  const customIcon = new Icon({
    iconUrl: "./matcha.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <div className="h-full w-full">
      <MapContainer
        ref={mapInstanceRef}
        className="rounded-xl shadow-md matcha-overlay"
        center={[53.3498, -6.2603]}
        zoom={12}
        maxBounds={[
          [51.4, -10.6],
          [55.4, -5.4],
        ]}
        maxBoundsViscosity={1.0}
        minZoom={6}
        style={{ height: "100%", width: "100%" }}
      >
        {places.map((place) => (
          <Marker
            key={place._id}
            position={[place.latitude, place.longitude]}
            icon={customIcon}
          >
            <Popup>
                <h3>{place.name}</h3>
                {/* <p>Matcha: {getAverageRating(place._id)} / 10</p> */}
            </Popup>
          </Marker>
        ))}
        <TileLayer
          url="https://tile.jawg.io/jawg-streets/{z}/{x}/{y}.png?access-token=whqqYa5LCMyqqgYbAJEXEUWstheh0K7eVsauDYzrWzJGAgNunjnNQKSctGUpljD6"
          attribution='<a href="https://jawg.io">&copy; Jawg</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          maxZoom={22}
        />
      </MapContainer>
    </div>
  );
};

export default MatchaMap;
