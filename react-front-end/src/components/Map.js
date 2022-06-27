import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../styles/misc.css";


export default function Map(location, name) {

  const long = location.location[0];
  const lat = location.location[1];
  const position = [long, lat];
  console.log(position)

  return (
    <MapContainer
      className="map"
      center={[long, lat]}
      zoom={14}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          This Contact Lives Here
        </Popup>
      </Marker>
    </MapContainer>
  );
}