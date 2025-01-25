"use client";

import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MatchaMap = () => {
 return (
   <div className="h-full w-full">
     <MapContainer
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
