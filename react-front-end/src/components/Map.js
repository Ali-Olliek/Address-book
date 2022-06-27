import React, {useState} from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import DraggableMarker from "./DraggableMarker";
import "../styles/main/main.css";


export default function Map({location, passLoc}) {
  let long;
  let lat;
  let position = []

  
  if(location === 0) {
    long = location.location[0];
    lat = location.location[1];
    position = [long, lat];
  } else {
    long = 33.8938;
    lat = 35.5018;
    position = [long, lat]
  }
  return (
    <MapContainer
      className="map"
      center={[long, lat]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <DraggableMarker />
    </MapContainer>
  );
}